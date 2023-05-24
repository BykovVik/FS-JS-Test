import React, {useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import './AuthForm.css'

const AuthForm = (props:any) => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return(
        <Col className="loginForm">
            <Form>
                <Form.Group className="formString">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя"/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Date of birth:</Form.Label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd.MM.yyyy" className="form-control"/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Check
                        inline
                        label="Man"
                        name="group1"
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-1`}
                    />
                    <Form.Check
                        inline
                        label="Wooman"
                        name="group1"
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-2`}
                    />
                    <Form.Check
                        inline
                        label="Other"
                        name="group1"
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-3`}
                    />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Photo:</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                
                <Button variant="success" type="submit">
                    Submit
                </Button>
                {props.title === 'login' &&
                <div className="navBlock">
                    
                    <p> | </p>
                    
                </div>
                }
                {props.title === 'registration' &&
                <div className="navBlock">
                    Вернуться на главную
                </div>
                }
            </Form>
        </Col>
    )
}

export default AuthForm