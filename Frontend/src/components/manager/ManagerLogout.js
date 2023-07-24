function ManagerLogout(){
    localStorage.removeItem('adminlogin');
    localStorage.removeItem('admintoken');
    window.location.href = "http://localhost:3000/"
    return (
        <div></div>
    );
}

export default ManagerLogout;