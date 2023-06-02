import React, {useState, useEffect} from 'react'
import http from "../../http-common";
import { Row, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./layout.css"

const Layout = (props:any) => {

    const navigate = useNavigate()

    useEffect(() => {
        //checks the validity of the token
        const checkAyth = async() => {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate('/')
            } else {
                //Check valid token
                const res = await http.post('/api/check-auth', {token: token})
                if (res.data.decoded.email !== localStorage.getItem("email")) {
                    navigate('/')
                }
            }
            
        }
        checkAyth()
    }, [])

    // navigation handlers
    const logOutHandler = () => {
        localStorage.clear()
        navigate('/')
    }
    const myProfileHandler = () => {
        navigate(`/account/${localStorage.getItem("id")}`)
    }

    return (
        <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Full stack task</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/people">People</Nav.Link>
                        <Nav.Link className='empty'></Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={myProfileHandler}>My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logOutHandler}>
                            Logout
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    {props.children}   
                </Row>
            </Container>
        </> 
    )
}

export default Layout