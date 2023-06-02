import React, {useState, useEffect} from "react";
import RegForm from "../components/auth/RegForm";
import LoginForm from "../components/auth/LoginForm";
import http from "../http-common";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [regState, setRegState] = useState<Boolean>(false);

    //user authorization check and redirect in case of authorization
    useEffect(()=> {
        const token = localStorage.getItem("token")
        if(token) {
            //Check valid token
            const res = http.post('/api/check-auth', {token: token})
            res.then((result:any) => {
                if (result.data.decoded.email === localStorage.getItem("email")) {          
                    navigate('/people');
                }
            })
        }
    }, [])
   
    return(
        <>
            { regState ? <LoginForm changeState={setRegState} /> : <RegForm changeState={setRegState}/> }
        </>
    )
}

export default Login