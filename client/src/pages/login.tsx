import React, {useState} from "react";
import RegForm from "../components/auth/RegForm";
import Layout from "../components/layout/layout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {

    const [regState, setRegState] = useState<Boolean>(false);
   
    return(
        <Layout>
            { regState ? <LoginForm changeState={setRegState} /> : <RegForm changeState={setRegState}/> }
        </Layout>
    )
}

export default Login