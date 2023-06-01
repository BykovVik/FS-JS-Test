import React, {useState, useEffect} from "react";
import './People.css'
import http from "../../http-common";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const People = () => {
    
    const [people, setPeople] = useState([])
    const baseUrl = "http://localhost:3333/"

    useEffect(() => {
        const getUser = async() => {
            await http.get('/api/users', {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}
            })
            .then((result:any) => {
                setPeople(result.data)
            })
        }
        getUser()
    }, [])

    const checkAge = (date:string) => {
        const birthday = new Date(date);
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age
    }

    return (
        <div className="card p-2 mt-4">
            {people.map((p, idx) => (
                p['email'] !== localStorage.getItem("email") &&
                    <div className="card people" key={idx}>
                        <Link to={`/account/${p['_id']}`}>
                            <Row className="card-items">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} className="card-item">
                                    <img className="avatar" src={baseUrl + p['avatar']} alt="" />
                                </Col>
                                <Col xxl={10} xl={10} lg={10} md={10} sm={10} className="card-item">
                                    <p><b>Name: </b>{p['name']}</p>
                                    <p><b>Age: </b>{checkAge(p['date'])}</p>
                                </Col>
                            </Row>
                        </Link>
                    </div>
                )
            )}
        </div>
    )
}
export default People