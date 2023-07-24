import { Link } from "react-router-dom";
import { Avatar } from 'primereact/avatar';

function Header() {

  const loginstatus = localStorage.getItem('loginstatus');
  const adminlogin = localStorage.getItem('adminlogin');
  const isadmin = localStorage.getItem('isadmin');
  const first_name = localStorage.getItem('first_name')

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-2" to="/">
            <img style={{width:"100px", height:"40px"}} src="\logo-no-background.png"></img><span>&nbsp;</span>Taste Mein Best Sherey da Best</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/detail/1">Cuisines</Link>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manager
                </a>
                {adminlogin!='true' &&
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/manager/login">Login</Link></li>
                </ul>
                }
                
                {adminlogin=="true" &&
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/manager/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/manager/logout">Logout</Link></li>
                </ul>
                }
              </li> */}

              {loginstatus == 'true' &&
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar icon="pi pi-user" className="mr-2"  style={{height:"25px", width:"110px", backgroundColor: '#2196F3', color: '#ffffff' }}><span>&nbsp;</span>
                    {first_name}
                    </Avatar>
                  </a>

                  <ul className="dropdown-menu">
                    {/* <li><Link className="dropdown-item" to="/myacc">My account</Link></li> */}
                    {isadmin == 'true' && <li><Link className="dropdown-item" to="/manager/dashboard">Manager</Link></li>}
                    <li><Link className="dropdown-item" to="/manager/user/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                    <li><Link className="dropdown-item" to="/user/tracklatestorder">Track Order</Link></li>
                    {/* <li><Link className="dropdown-item" to="/settings">Settings</Link></li> */}
                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                  </ul>
                  {/* <li><Link className="dropdown-item" to="/login">Login</Link></li> */}
                </li>
              }

              {loginstatus != 'true' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>

  );
}

export default Header;