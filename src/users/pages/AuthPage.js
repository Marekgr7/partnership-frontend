import React, { useState } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Button from "react-bootstrap/Button";


const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        setIsLoginMode(!isLoginMode);
    };

    const submitAuthForm = (event, email, password, isPartnership = undefined) => {
        event.preventDefault();
        console.log(email, password);
        if (isPartnership === undefined && isLoginMode) {
            //TODO login post
            console.log('it works');
        } else {
            //TODO registration post
            console.log('it works');
        }
    };

    return (
        <React.Fragment>
            {isLoginMode ? <Login onSubmit={submitAuthForm}/> : <Register onSubmit={submitAuthForm}/>}
            <Button onClick={switchModeHandler}>Zaloguj</Button>
        </React.Fragment>
    );

};

export default AuthPage;