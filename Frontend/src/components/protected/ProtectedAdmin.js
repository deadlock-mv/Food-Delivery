import { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedAdmin (props){
    const { Component} = props;
    const isAdmin = localStorage.getItem('isadmin')
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin){
            Swal.fire({
                title: "Restricted Page!!!",
                text: "Need Super User",
                icon: "error",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then((result)=>{
                navigate('/login');
            })
        }
    }, [])

    return (
        <div>
            {isAdmin == 'true' &&
                <Component/>
            }
        </div>
    )
}

export default ProtectedAdmin;