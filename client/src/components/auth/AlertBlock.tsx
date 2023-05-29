import React from "react";
import { Alert } from "react-bootstrap";

type Props = {
    addClass: string
}

function AlertBox(props:Props) {
  
    return (
        <Alert variant="danger" className={props.addClass}>
            we already have a registered user with the same name or email
        </Alert>
    );
}

export default AlertBox
