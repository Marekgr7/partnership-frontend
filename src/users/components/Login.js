import React, { useContext } from 'react';
import { Form, Field } from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";
import axios from "axios";
import Modali, { useModali } from 'modali';

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
    const [errorModal, toggleErrorModal] = useModali({
        animated: true,
        title: 'Ups!'
    });

    const handleSubmit = (data, event) => {
        axios.post('http://localhost:5000/api/users/login', {
            email: data.email,
            password: data.password
        }).then(response => {
            auth.login(response.data.userId, response.data.token, response.data.isPartnership, response.data.isOwner);
        }).catch(err => {
            toggleErrorModal();
        });
        event.preventDefault();
    }


    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={{}}
            render={(formRenderProps) => (
                <form onSubmit={formRenderProps.onSubmit}>
                    <Modali.Modal {...errorModal}>
                        &nbsp;&nbsp;&nbsp;&nbsp; Wprowadziłeś błędne dane logowania!
                    </Modali.Modal>
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

                    <button className="button-auth">Loguj</button>
                    <button className="button-auth" onClick={() => props.switchMode()}>Jeżeli nie posiadasz konta Zarejestruj się</button>
                </form>
            )}>
        </Form>
    );
}

export default Login;


