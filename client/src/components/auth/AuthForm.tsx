import React, {useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import http from "../../http-common";
import './AuthForm.css'

//Props block
type Props = {
    title: string
}
type FormType = {
    name: string;
    email: string;
    password: string;
    date: string;
    gender: string;
    avatar: string;
}
type CHBState = {
    man: boolean;
    woman: boolean;
}

const AuthForm = (props:Props) => {

    //UseState block
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [checkBoxState, setCheckBoxState] = useState<CHBState>({man: false, woman: false})
    const [formData, setFormData] = useState<FormType>({name: "", email: "", password: "", date: "", gender: "", avatar: ""})

    //Handler block
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const isChecked = event.target.checked;
        setCheckBoxState({ ...checkBoxState, [name]: isChecked});
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        formData.date = String(selectedDate?.toLocaleDateString())
        formData.gender = String(checkBoxState.man ? "man" : "woman")
        console.log("ЭТОО", formData)
        try {
          const response = await http.post('/api/users', formData);
          console.log(response.data); 
        } catch (error) {
          console.error(error);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return(
        <Col className="loginForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="formString">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя" name="name" value={formData.name} onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" name="email" value={formData.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" name="password" value={formData.password} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Date of birth:</Form.Label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd.MM.yyyy" className="form-control"/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Check 
                        type="switch"
                        id="custom-switch-1"
                        label="Man"
                        name="man"
                        onChange={handleSwitchChange}
                        disabled={!checkBoxState.man && checkBoxState.woman}
                    />
                    <Form.Check 
                        type="switch"
                        label="Woman"
                        name="woman"
                        id="custom-switch-2"
                        onChange={handleSwitchChange}
                        disabled={checkBoxState.man && !checkBoxState.woman}
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