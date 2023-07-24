import { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedLoggedIn (props){
    const { Component} = props;
    const loginStatus = localStorage.getItem('loginstatus')
    const navigate = useNavigate();

    useEffect(() => {
        if (loginStatus){
            Swal.fire({
                title: "User already logged in!!!",
                text: "cannot access this page",
                icon: "error",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then((result)=>{
                navigate('/');
            })
        }
    }, [])

    return (
        <div>
            {!loginStatus &&
                <Component/>
            }
        </div>
    )
}

export default ProtectedLoggedIn;