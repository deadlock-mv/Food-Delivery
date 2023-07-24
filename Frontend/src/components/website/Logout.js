function Logout(){
    localStorage.removeItem('loginstatus');
    localStorage.removeItem('userid');
    localStorage.removeItem('admintoken');
    localStorage.removeItem('isadmin');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');

    window.location.href = "http://localhost:3000/login"
    return (
        <div></div>
    );
}

export default Logout;