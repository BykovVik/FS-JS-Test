import React, {useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import AlertBox from "./AlertBlock";
import http from "../../http-common";
import { useNavigate } from "react-router-dom";

//Types block
type Props = {
    changeState: Function
}
type FormType = {
    email: string;
    password: string;
}

const LoginForm = (props:Props) => {

    const navigate = useNavigate();
    
    const [error, setError] = useState<boolean | null>(null);
    const [formData, setFormData] = useState<FormType>({
        email: "",
        password: ""
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setError(false)
    };
    const goRegPage = () => {
        props.changeState(false)
    }
    //Submit handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //check user by email
        const user = await http.get('/api/get-user-by-email', { params: { email: formData.email} });

        //send form-data
        if (user.data.length !== 0) {
            if (user.data[0].password === formData.password) {
                const response = await http.post('/api/auth', formData);
                localStorage.setItem('token', String(response.data.token));
                localStorage.setItem('email', String(user.data[0].email));
                localStorage.setItem('password', String(user.data[0].password));
                navigate('/people');
            } else {
                setError(true)
            }
        } else {
            setError(true)
        }
    };
    return(
        <Col className="loginForm">
            <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1>Authorization</h1>
                </div>
                <Form.Group className="formString">
                    <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required/>
                </Form.Group>
                
                <Button variant="success" type="submit" className="mb-4">
                    Submit
                </Button>
                <div className="mb-4 text-center">
                    <a href="#" onClick={goRegPage}>Go to Registration page</a>
                </div>
                {error &&
                    <AlertBox addClass="fade-in" addText="Email or password is incorrect, please try again"/>
                }
                {!error &&
                    <AlertBox addClass="fade-none" addText="Email or password is incorrect, please try again"/>
                }
            </Form>
        </Col>
    )
}

export default LoginForm