import React from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import './Login.css';

const Login = props => {


    return (
        <Form className="login-form" onSubmit={(e) => props.onSubmit(e, email, password)}>
            <Form.Group controlId="formEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control type="email" placeholder="Wprowadź email"/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Zaloguj
            </Button>
        </Form>

    );
}

export default Login;


