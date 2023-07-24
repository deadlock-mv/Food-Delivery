import { Component, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedOrderList(props) {
    const { Component } = props;
    const loginStatus = localStorage.getItem('loginstatus')
    const location = useLocation();
    const [flag, setFlag] = useState(true);
    let data = location.state?.data;
    console.log(data);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            Swal.fire({
                title: "User not logged in!!!",
                text: "Please login to access this page.",
                icon: "error",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then((result) => {
                navigate('/login');
            })
        } else if (JSON.stringify(data) === '{}') {
            setFlag(false);
            Swal.fire({
                title: "No Items From Menu!!!",
                text: "Please Choose Items from Menu",
                icon: "error",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then((result) => {
                navigate('/detail/1');
            })
        }
    }, [])

    return (
        <div>
            {loginStatus == 'true' && flag &&
                <Component />
            }
        </div>
    )
}

export default ProtectedOrderList;