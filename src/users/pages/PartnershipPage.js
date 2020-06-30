import React, {context, useContext} from 'react';
import axios from 'axios';

import {AuthContext} from "../../shared/context/auth-context";
import './Partnership.css';

const isPartnership = (userId) => {
    let isPartnership = false;

    axios.get('http://localhost:5000/api/users/partnership')
        .then(response => isPartnership = response.data.isPartnership)
        .catch(error => console.log(error));

    return isPartnership;
};

const referralLink = (userId) => {
    let refLink = "";

    axios.get('http://localhost:5000/api/users/referral')
        .then(response => refLink = response.data.refLink)
        .catch(error => console.log(error));

    return refLink;
};

const PartnershipPage = () => {
    const auth = useContext(AuthContext);
    return <div className="partnership-page">Program Partnerski</div>
};

export default PartnershipPage;