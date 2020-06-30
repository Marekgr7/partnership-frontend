import React, { useState } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

import './AuthPage.css';


const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <React.Fragment>
            <div className="auth-body">
            {isLoginMode ? <Login switchMode={switchModeHandler}/> : <Register switchMode={switchModeHandler}/>}
            </div>
            <button onClick={switchModeHandler}> zmien </button>
        </React.Fragment>
    );

};

export default AuthPage;