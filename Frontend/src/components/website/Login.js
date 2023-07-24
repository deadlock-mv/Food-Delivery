import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
// import './CSS/Login.css'

function Login() {
    // const [logindata, setLoginData] = useState({
    //     username: "",
    //     password: "",
    // })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({
        username:"",
        password:"",
    })

    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //       console.log(data);
    //     }
    //   }, [formErrors]);

    const handleChange = (e) => {
        setErrorMessage(null)
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        // console.log(data)
      };
    
    
    function onSubmit(e) {
        e.preventDefault();
        const validErrors = validate(data)
        // console.log(formErrors)
        console.log(validErrors)

        setIsSubmit(true);

        if(Object.keys(validErrors).length==0)
        {
                axios({
                    method: "POST",
                    url: "http://127.0.0.1:8000/api/login/",
                    data:
                        {
                        username: data.username,
                        password: data.password,
                    },
                })
                    .then((res) => {
                        if(res.data.bool == true) {
                            localStorage.setItem('loginstatus', true)
                            localStorage.setItem('userid',res.data.userid)
                            localStorage.setItem('isadmin', res.data.isadmin)
                            localStorage.setItem('token', res.data.access)
                            localStorage.setItem('username',res.data.username)
                            localStorage.setItem('first_name',res.data.first_name)
                            localStorage.setItem('last_name',res.data.last_name)
                            localStorage.setItem('email',res.data.email)
                            window.location.href = "http://localhost:3000/detail/1"
                            console.log(res.data.bool)
                            console.log(res.data.userid)
                            // alert()
                        } else {
                            console.log("nahi chala")
                        }
                    })
                    .catch((err) =>{
                        setErrorMessage(err.response.data.detail)
                        setData({username:'', password:''})
                        
                    })
            
        }
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!values.username) {
          errors.username = "Username is required!";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } 
        // else if (values.password.length < 4) {
        //   errors.password = "Password must be more than 4 characters";
        // } else if (values.password.length > 10) {
        //   errors.password = "Password cannot exceed more than 10 characters";
        // }
        else if(!regex.test(values.password)){
            errors.password = "Password should contain atleast one of [@,!,$...], [0-9], letters and min.length of 6 and max 0f 16"
        }
        setFormErrors(errors);
        return errors;
      };



    const loginstatus = localStorage.getItem('loginstatus')
    if (loginstatus == 'true'){
        
    }


    // function handleChange(e) {
    //     const newdata = { ...logindata }
    //     newdata[e.target.id] = e.target.value
    //     setLoginData(newdata)
    //     // console.log(newdata)
    // }

    return (
        <section className="vh-100 gradient-custom" >
            <div className="container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your Email and password!</p>
                                        {errorMessage && <Alert>{errorMessage}</Alert> }

                                        <div style={{height:"30px"}}><code>{formErrors.username}</code></div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="text" onChange={(e)=>handleChange(e)} name="username" value={data.username}  placeholder="Username" className="form-control form-control-lg"  />
                                           
                                        </div>

                                        <div style={{height:"60px"}}><code>{formErrors.password}</code></div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="password" onChange={(e)=>handleChange(e)} name="password" value={data.password} placeholder="Password" className="form-control form-control-lg" />
                                            
                                        </div>

                                        {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" value="Submit">Login</button>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                        </div>

                                    </div>
                                </form>

                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;