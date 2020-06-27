import React from 'react';

import {Form, Button, Row, Col} from 'react-bootstrap';


const Register = props => {

    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group controlId="formEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control type="email" placeholder="Wprowadź email"/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
            </Form.Group>
            <Form.Group controlId="formPartnership">
                <Form.Check type="checkbox" label="Dołącz do programu partnerskiego"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Zarejestruj i testuj !
            </Button>
        </Form>
    );
}

export default Register;
