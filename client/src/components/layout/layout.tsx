import React from 'react'
import {Container, Row} from 'react-bootstrap'

const Layout = (props:any) => {

    return (
        <Container>
            <Row>
                {props.children}   
            </Row>
        </Container>
    )
}

export default Layout