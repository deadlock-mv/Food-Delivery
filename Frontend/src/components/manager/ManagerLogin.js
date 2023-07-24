import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../CSS/ManagerLogin.css';
import axios from 'axios';

function ManagerLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        try {
            axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/login/",
                data:
                    {
                    username: username,
                    password: password,
                },
            })
                .then((res) => {
                    if(res.data.bool == true) {
                        localStorage.setItem('adminlogin', true)
                        localStorage.setItem('admintoken', res.data.access)
                        window.location.href = "http://localhost:3000/manager/dashboard"
                        alert()
                    } else {
                        console.log("nahi chala")
                    }
                });
        } catch (error) {
            console.log(error)
         }
    }

    const adminlogin = localStorage.getItem('adminlogin')
    if (adminlogin == 'true'){
        
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow style={{ display: "flex", alignItems: "center" }} >
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='6' md='4' >

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2 text-uppercase text-danger">Manager Login</h2>

                            <div className="form-outline form-white mb-4">
                                <input type="text" onChange={(e) => setUsername(e.target.value)} id="username" className="form-control form-control-lg" required="Enter things" />
                                <label className="form-label" for="typeEmailX">Username</label>
                            </div>

                            <div className="form-outline form-white mb-4">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" className="form-control form-control-lg" required />
                                <label className="form-label" for="typePasswordX">Password</label>
                            </div>

                            <button className="btn btn-outline-dark btn-lg px-5" type="submit" value="Submit">Login</button>

                        </div>
                    </form>



                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default ManagerLogin;