import React, {useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import http from "../../http-common";
import { AxiosRequestConfig } from "axios";
import './Forms.css'
import AlertBox from "./AlertBlock";

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
    avatar: File | null;
}
type CHBState = {
    man: boolean;
    woman: boolean;
}
//Axios query configuration
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
};

const RegForm = () => {

    //UseState block
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [checkBoxState, setCheckBoxState] = useState<CHBState>({man: false, woman: false})
    const [formData, setFormData] = useState<FormType>({name: "", email: "", password: "", date: "", gender: "", avatar: null})
    const [error, setError] = useState<boolean | null>(null);

    //Handler block
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const isChecked = event.target.checked;
        setCheckBoxState({ ...checkBoxState, [name]: isChecked});
    }
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setError(false)
    };
    //Submit handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //adding date data
        formData.date = String(selectedDate?.toLocaleDateString())
        //adding gender data
        formData.gender = checkBoxState.man ? "man" : "woman"
        //adding file data
        formData.avatar = selectedFile ? selectedFile : null

        //validation unique fields
        const nameDuplication = await http.get('/api/get-user-by-name', { params: { name: formData.name } });
        const emailDuplication = await http.get('/api/get-user-by-email', { params: { email: formData.email} });

        //send form-data
        if (nameDuplication.data.length === 0 && emailDuplication.data.length === 0) {
            await http.post('/api/users', formData, config);
        } else {
            setError(true)
        }
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

                <Form.Group className="formString">
                    <Form.Label>Date of birth:</Form.Label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd.MM.yyyy" className="form-control" required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Check type="switch" id="custom-switch-1" label="Man" name="man" onChange={handleSwitchChange} disabled={!checkBoxState.man && checkBoxState.woman} required />
                    <Form.Check type="switch" label="Woman" name="woman" id="custom-switch-2" onChange={handleSwitchChange} disabled={checkBoxState.man && !checkBoxState.woman} required />
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Photo:</Form.Label>
                    <Form.Control type="file" name="file" accept="image/*" onChange={handleFileInputChange} required/>
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

export default RegForm