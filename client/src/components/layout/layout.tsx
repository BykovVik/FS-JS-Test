import React, {useState, useEffect} from 'react'
import http from "../../http-common";
import NoAuth from './noauth';
import { Row, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Layout = (props:any) => {

    const[isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token) {
            //Check valid token
            const res = http.post('/api/check-auth', {token: token})
            res.then((result:any) => {
                if (result.data.decoded.email === localStorage.getItem("email")) {
                    setIsLogged(true)  
                }
            })
        }
    }, [])

    return (
        <>
        {isLogged &&
            <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Full stack task</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
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
        }
        { !isLogged && <NoAuth/> }
        </>
        
    )
}

export default Layout