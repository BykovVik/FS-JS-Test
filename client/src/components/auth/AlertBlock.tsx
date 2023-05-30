import React from "react";
import { Alert } from "react-bootstrap";

type Props = {
    addClass: string
    addText: string
}

function AlertBox(props:Props) {
  
    return (
        <Alert variant="danger" className={props.addClass}>
            {props.addText}
        </Alert>
    );
}

export default AlertBox
