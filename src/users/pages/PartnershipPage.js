import React, {context, useContext, useEffect, useState} from 'react';
import axios from 'axios';

import {AuthContext} from "../../shared/context/auth-context";
import ReferredUserItem from "../components/ReferredUserItem";
import './Partnership.css';

const isPartnership = (userId) => {
    let isPartnership = false;

    axios.get(`http://localhost:5000/api/users/partnership/${userId}`)
        .then(response => isPartnership = response.data.isPartnership)
        .catch(error => console.log(error));

    return isPartnership;
};


const PartnershipPage = () => {
    const auth = useContext(AuthContext);

    const [refLink, setRefLink] = useState("");
    const [refAccounts, setRefAccounts] = useState([]);

    const referralLink = () => {
        axios.get(`http://localhost:5000/api/users/referral/${auth.userId}`)
            .then(response => {
                setRefLink(response.data.referral);
            })
            .catch(error => console.log(error));
    };

    const getRefAccounts = () => {
        axios.get(`http://localhost:5000/api/users/accounts-referred/${auth.userId}`)
            .then(response => {
                setRefAccounts(response.data.refAccounts);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        referralLink();
        getRefAccounts();
        console.log(refLink);
    }, [refLink]);

    return (
        <React.Fragment>
            <p> Link do poleceń:</p>
            <a>http://localhost:5000/login/{refLink}</a>
            <p>Konta utworzone dzięki Twojemu poleceniu: </p>
            <ul>
                {refAccounts.map((email) => {
                    return <ReferredUserItem key={email} email={email} />
                })}
            </ul>
        </React.Fragment>
    );
};

export default PartnershipPage;