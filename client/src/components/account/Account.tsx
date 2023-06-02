import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../http-common";
import { Form, Button, Col, Row } from "react-bootstrap";
import './Account.css'
import { AxiosRequestConfig } from "axios";

type FormType = {
    id: string;
    name: string;
    password: string;
    avatar: File | null;
}

//Axios query configuration
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
};

const Profile = () => {

    const baseUrl = "http://127.0.0.1:3333/"

    //params from route /account/:userId
    const {userId} = useParams()

    const [user, setUser] = useState([])
    const [formData, setFormData] = useState<FormType>({id: "", name: "", password: "", avatar: null})
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //search user by id before every render
    useEffect(() => {
        const get_user = async() => {
            await http.get('/api/get-user-by-id', { params: { id: userId } })
            .then((result:any) => {
                setUser(result.data)
            })
        }
        get_user()
    }, [user])

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

        //add editing user id
        formData.id = String(userId)
        //adding file data
        formData.avatar = selectedFile ? selectedFile : null
        try {
            await http.post('/api/edit-user', formData, config);
        } catch (error) {
            console.log(error)
            return error
        }
    };

    return(
        <>
            {userId === localStorage.getItem("id") &&
            <>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                {user.map((u, idx) => (
                    <div className="card profile mt-4 p-4" key={idx}>
                        <Row>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={6}>
                                <img className="avatar" src={baseUrl + u['avatar']} alt="" />
                            </Col>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={6}>
                                <p><b>Name: </b>{u['name']}</p>
                                <p><b>Email: </b>{u['email']}</p>
                                <p><b>Date: </b>{u['date']}</p>
                                <p><b>Gender: </b>{u['gender']}</p>
                                <p><b>Password: </b>{u['password']}</p>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Col>
            <Col className="editform card mt-4 p-4" xxl={6} xl={6} lg={6} md={12} sm={12}>
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
            </>
            }
            {userId !== localStorage.getItem("id") &&
            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                {user.map((u, idx) => (
                    <div className="card profile mt-4 p-4" key={idx}>
                        <Row>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={6}>
                                <img className="avatar" src={baseUrl + u['avatar']} alt="" />
                            </Col>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={6}>
                                <p><b>Name: </b>{u['name']}</p>
                                <p><b>Email: </b>{u['email']}</p>
                                <p><b>Date: </b>{u['date']}</p>
                                <p><b>Gender: </b>{u['gender']}</p>
                                <p><b>Password: </b>{u['password']}</p>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Col>
            }
        </>
    )
}
export default Profile