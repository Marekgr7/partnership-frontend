import React, { Component, useContext } from "react";
import axios from 'axios';
import { Form, Field } from "@progress/kendo-react-form";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

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
    new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(value) ? "" : "Hasło powinno zawierać minimum 8 znaków,jedną dużą literę jedną liczbę oraz znak specjalny "
);


const Register = props => {

    const auth = useContext(AuthContext);

    const handleSubmit = (data, event) => {

        if (data.password !== data.passwordConf) {
            //TODO PASSWORDS NOT MATCH !
        } else {
            axios.post('http://localhost:5000/api/users/signup', {
                email: data.email,
                password: data.password
            }).then(response => {
                auth.login(response.data.userId, response.data.token);
            }).catch(err => {
                console.log(err);
            })
        }
        event.preventDefault();
    }


    return (
        <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
                <form onSubmit={formRenderProps.onSubmit}>
                    <h1>Stwórz konto</h1>

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

                    <button disabled={!formRenderProps.allowSubmit && Field.password === Field.passwordConf}>
                        Rejestruj
                    </button>
                </form>
            )}>
        </Form>
    );
}

export default Register;
