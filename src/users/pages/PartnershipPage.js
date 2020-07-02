import React, {context, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Modali, {useModali} from 'modali';

import {AuthContext} from "../../shared/context/auth-context";
import ReferredUserItem from "../components/ReferredUserItem";
import './Partnership.css';


const PartnershipPage = () => {

    const auth = useContext(AuthContext);

    const [refLink, setRefLink] = useState("");
    const [refAccounts, setRefAccounts] = useState([]);
    const [errorMessage, setErrorMessage] = useState();


    const [errorModal, toggleErrorModal] = useModali({
        animated: true,
        title: 'Wystąpił błąd !',
        onHide: () => {
            setErrorMessage(undefined)
        }
    });

    const referralLink = () => {
        axios.get(`http://localhost:5000/api/partnership/referral/${auth.userId}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setRefLink(response.data.referral);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                toggleErrorModal();
            });
    };

    const getRefAccounts = () => {
        axios.get(`http://localhost:5000/api/partnership/accounts-referred/${auth.userId}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setRefAccounts(response.data.refAccounts);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                toggleErrorModal();
            });
    }

    const isPartnership = (userId) => {
        let isPartnership = false;

        axios.get(`http://localhost:5000/api/partnership/check/${userId}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then(response => isPartnership = response.data.isPartnership)
            .catch(error => console.log(error));

        return isPartnership;
    };


    useEffect(() => {
        referralLink();
        getRefAccounts();
    }, []);

    return (
        <React.Fragment>
            <Modali.Modal {...errorModal}>
                {errorMessage}
            </Modali.Modal>
            <div className="partnership-box">
                <p> Link do poleceń:</p>
                <a>http://localhost:3000/register/{refLink}</a>
                <p>Konta utworzone dzięki Twojemu poleceniu: </p>
            </div>
            <ul>
                {refAccounts.map((email) => {
                    return <ReferredUserItem key={email} email={email}/>
                })}
            </ul>
        </React.Fragment>
    );
};

export default PartnershipPage;