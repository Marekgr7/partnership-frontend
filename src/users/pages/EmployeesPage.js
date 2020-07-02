import React, {useContext} from 'react';

import axios from 'axios';
import {Form, Field} from "@progress/kendo-react-form";
import {Input, Checkbox} from "@progress/kendo-react-inputs";
import {DropDownList} from "@progress/kendo-react-dropdowns";

import {AuthContext} from '../../shared/context/auth-context';

import './EmployeesPage.css';


const CustomInput = ({fieldType, ...others}) => {
    return (
        <div>
            <Input
                type={fieldType}
                {...others} />
            <ValidationMessage {...others} />
        </div>
    );
};

const CustomDropDown = ({options, ...others}) => {
    return (
        <div>
            <DropDownList
                data={options}
                {...others} />
            <ValidationMessage {...others} />
        </div>
    )
}

const CustomCheckbox = ({...props}) => {
    return (
        <div>
            <Checkbox {...props} />
            <ValidationMessage {...props} />
        </div>
    );
};

const ValidationMessage = ({valid, visited, validationMessage}) => {
    return (
        <>
            {!valid && visited &&
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


const EmployeesPage = () => {

    const auth = useContext(AuthContext);

    const handleSubmit = (data, event) => {
        console.log(data);
        if (data.password !== data.passwordConf) {
            alert('Hasła nie są zgodne');
        } else {
            axios.post('http://localhost:5000/api/users/signup/subaccount', {
                email: data.email,
                password: data.password,
                ownerId: auth.userId
            }).then(response => {
                alert('Załozyłeś konto dla pracownika');
            }).catch(err => {
                console.log(err);
            })
        }
        event.preventDefault();
    }


    return (
        <div className="auth-body-employees">
            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                    <form onSubmit={formRenderProps.onSubmit}>
                        <h1>Stwórz konto dla pracownika</h1>

                        <Field
                            label="Email"
                            name="email"
                            fieldType="email"
                            component={CustomInput}
                            validator={emailValidator}/>

                        <Field
                            label="Hasło"
                            name="password"
                            fieldType="password"
                            component={CustomInput}
                            validator={specialCase}/>

                        <Field
                            label="Powtórz hasło"
                            name="passwordConf"
                            fieldType="password"
                            component={CustomInput}
                            validator={requiredValidator}/>


                        <button disabled={!formRenderProps.allowSubmit}>
                            Rejestruj
                        </button>
                    </form>
                )}>
            </Form>
        </div>
    );
}

export default EmployeesPage;