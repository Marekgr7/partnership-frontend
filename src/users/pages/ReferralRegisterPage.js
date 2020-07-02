import React, { Component, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Form, Field } from "@progress/kendo-react-form";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Modali, { useModali } from 'modali';

import { AuthContext } from '../../shared/context/auth-context';


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

const CustomDropDown = ({ options, ...others }) => {
    return (
        <div>
            <DropDownList
                data={options}
                {...others} />
            <ValidationMessage {...others} />
        </div>
    )
}

const CustomCheckbox = ({ ...props }) => {
    return (
        <div>
            <Checkbox {...props} />
            <ValidationMessage {...props} />
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

const emailValidator = (value) => (
    new RegExp(/\S+@\S+\.\S+/).test(value) ? "" : "Wprowadź poprawny adres email."
);
const requiredValidator = (value) => {
    return value ? "" : "Te pole jest wymagane";
}

const specialCase = (value) => (
    new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g).test(value) ? "" : "Hasło powinno zawierać minimum jeden znak, cyfrę, duża literę."
);


const Register = props => {

    const auth = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState();

    const [passModal, togglePassModal] = useModali({
        animated: true,
        title: 'Ups!'
    });

    const [errorModal, toggleErrorModal] = useModali({
        animated: true,
        title: 'Wystąpił błąd !',
        onHide: () => {setErrorMessage(undefined)}
    });

    const handleSubmit = (data, event) => {
        console.log(data);
        if (data.password !== data.passwordConf) {
            togglePassModal();
        } else {
            axios.post('http://localhost:5000/api/users/signup', {
                email: data.email,
                password: data.password,
                isPartnership: data.acceptedTerms,
                referralLink: props.referral
            }).then(response => {
                auth.login(response.data.userId, response.data.token, response.data.isPartnership, response.data.isOwner);
            }).catch(err => {
                setErrorMessage(err.response.data.message);
                console.log(err.response.data.message);
                toggleErrorModal();
            })
        }
        event.preventDefault();
    }

    return (
        <div className="auth-body">
            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                    <form onSubmit={formRenderProps.onSubmit}>
                        <Modali.Modal {...passModal}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Hasła nie są zgodne !
                        </Modali.Modal>
                        <Modali.Modal {...errorModal}>
                            {errorMessage}
                        </Modali.Modal>
                        <h1>Stwórz konto z polecenia !</h1>

                        <Field
                            label="Email"
                            name="email"
                            fieldType="email"
                            component={CustomInput}
                            validator={emailValidator} />

                        <Field
                            label="Hasło"
                            name="password"
                            fieldType="password"
                            component={CustomInput}
                            validator={specialCase} />

                        <Field
                            label="Powtórz hasło"
                            name="passwordConf"
                            fieldType="password"
                            component={CustomInput}
                            validator={requiredValidator} />


                        <Field
                            label="Program Partnerski"
                            name="acceptedTerms"
                            component={CustomCheckbox}
                        />

                        <button  className="button-auth" disabled={!formRenderProps.allowSubmit}>
                            Rejestruj
                        </button>
                    </form>
                )}>
            </Form>
        </div>
    );
}

export default Register;
