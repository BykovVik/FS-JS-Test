import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../http-common";
import { Form, Button, Col } from "react-bootstrap";

type FormType = {
    name: string;
    password: string;
    avatar: File | null;
}

const Profile = () => {

    const {userId} = useParams()
    const [user, setUser] = useState([])
    const [formData, setFormData] = useState<FormType>({name: "", password: "", avatar: null})
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const get_user = async() => {
            await http.get('/api/get-user-by-id', { params: { id: userId } })
            .then((result:any) => {
                setUser(result.data)
            })
        }
        get_user()
    }, [])

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    //Submit handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //adding file data
        formData.avatar = selectedFile ? selectedFile : null
        await http.post('/api/registration', formData);
    };

    return(
        <Col className="loginForm">
            <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1>Edit profile</h1>
                </div>
                <Form.Group className="formString">
                    <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required/>
                </Form.Group>

                <Form.Group className="formString">
                    <Form.Label>Choose profile photo:</Form.Label>
                    <Form.Control type="file" name="file" accept="image/*" onChange={handleFileInputChange} required/>
                </Form.Group>
                
                <Button variant="success" type="submit" className="mb-4">
                    Submit
                </Button>
            </Form>
        </Col>
    )
}
export default Profile