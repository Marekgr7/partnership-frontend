import React, {useState, useEffect, useContext, useCallback} from 'react';
import axios from "axios";
import {AuthContext} from "../../shared/context/auth-context";

import './SettingsPage.css';


const SettingsPage = () => {

    const auth = useContext(AuthContext);
    const [isPartnership, setIsPartnership] = useState(false);

    const setPartnership = (e, isPartnership) => {
        axios.post('http://localhost:5000/api/users/partnership', {
            partnershipToSet: isPartnership,
            userId: auth.userId
        }).then(response => {
            let existingData = JSON.parse(localStorage.getItem('userData'));
            console.log(existingData);
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    userId: existingData.userId,
                    token: existingData.token,
                    isPartnership: response.data.isPartnership,
                    isOwner: existingData.isOwner,
                    expiration: existingData.expiration
                })
            );
            alert('Pomyślnie zapisałeś ustawienia !');
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
        e.preventDefault();
    };

    const checkPartnership = (userId) => {

        axios.get(`http://localhost:5000/api/users/partnership/${userId}`)
            .then(response => {
                console.log(response.data);
                setIsPartnership(response.data.isPartnership);
                console.log(isPartnership);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        checkPartnership(auth.userId);
    }, []);

    const inputHandler = () => {
        setIsPartnership(!isPartnership);
    };

    return (
        <div className="auth-body-employees">
            <form className="partnership-form" onSubmit={(e) => {
                setPartnership(e, isPartnership)
            }}>
                <input type="checkbox" id="partnership" name="partnership" checked={isPartnership} onChange={inputHandler}/>
                <label htmlFor="option">Program partnerski </label>
                <button type="submit">Zapisz</button>
            </form>
        </div>
    )
};

export default SettingsPage;