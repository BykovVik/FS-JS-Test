import React, {useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import AlertBox from "./AlertBlock";

type FormType = {
    name: string;
    email: string;
    password: string;
}

const LoginForm = () => {

    const [error, setError] = useState<boolean | null>(null);
    const [formData, setFormData] = useState<FormType>({
        name: "",
        email: "",
        password: ""
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setError(false)
    };
    //Submit handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return(
        <Col className="loginForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="formString">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя" name="name" value={formData.name} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" name="email" value={formData.email} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" name="password" value={formData.password} onChange={handleInputChange} required/>
                </Form.Group>
                
                <Button variant="success" type="submit" className="mb-4">
                    Submit
                </Button>
                {error &&
                    <AlertBox addClass="fade-in" />
                }
                {!error &&
                    <AlertBox addClass="fade-out" />
                }
            </Form>
        </Col>
    )
}

export default LoginForm