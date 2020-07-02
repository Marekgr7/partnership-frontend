import React, { useContext } from 'react';
import { Form, Field } from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";
import axios from "axios";

import {AuthContext} from "../../shared/context/auth-context";
import './Login.css';

const CustomInput = ({ fieldType, ...others }) => {
    return (
        <div>
            <Input
                type={fieldType}
                {...others} />
            <ValidationMessage {...others} />
        </div>
    );
};

const ValidationMessage = ({ valid, visited, validationMessage }) => {
    return (
        <>
            { !valid && visited &&
            (<div className="required">{validationMessage}</div>)}
        </>
    );
}

const Login = props => {

    const auth = useContext(AuthContext);


    const handleSubmit = (data, event) => {
        axios.post('http://localhost:5000/api/users/login', {
            email: data.email,
            password: data.password
        }).then(response => {
            auth.login(response.data.userId, response.data.token, response.data.isPartnership, response.data.isOwner);
        }).catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }


    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={{}}
            render={(formRenderProps) => (
                <form onSubmit={formRenderProps.onSubmit}>
                    <h1>Zaloguj się</h1>

                    <Field
                        label="Email"
                        name="email"
                        fieldType="email"
                        component={CustomInput}
                    />

                    <Field
                        label="Hasło"
                        name="password"
                        fieldType="password"
                        component={CustomInput}
                        />

                    <button>Loguj</button>
                    <button onClick={() => props.switchMode()}>Jeżeli nie posiadasz konta Zarejestruj się</button>
                </form>
            )}>
        </Form>
    );
}

export default Login;


