import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import Home from './website/Home'
import Header from './website/HeaderHome'
import Footer from './website/Footer'
import About from './About'
import Login from './website/Login'
import MyAccount from './MyAccount'
import Settings from './Settings'
import Orders from './user/Orders'
import Signup from './website/Signup'
import Cuisines from './website/Cuisines'
import OrderList from './website/Orderlist'
import Payment from './website/PaymentMethods'
import Logout from './website/Logout'
import ManagerLogin from './manager/ManagerLogin'
import ManagerLogout from './manager/ManagerLogout'
import ManagerDash from './manager/ManagerDashboard'
import ManagerCategory from './manager/ManagerCategory'
import ManagerOrder from './manager/ManagerOrder'
import ManagerItem from './manager/ManagerItem'
import Profile from './user/Profile'
import NotFound from './website/NotFound'
import TrackOrder from './user/TrackOrder'
import TrackLatestOrder from './user/TrackLatestOrder'
import ProtectedLogin from './protected/ProtectedLogin'
import ProtectedAdmin from './protected/ProtectedAdmin'
import ProtectedOrderList from './protected/ProtectedOrderlist'
import ProtectedLoggedIn from './protected/ProtectedLoggedIn'


import {Routes as Switch,Route} from 'react-router-dom'

function Main() {
  return (
    <div className="Main">
      {/* <Header /> */}
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<ProtectedLoggedIn Component={Login}/>}/>
        <Route path="/myacc" element={<MyAccount/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/orders" element={<ProtectedLogin Component={Orders}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/detail/:cuisine_id" element={<Cuisines/>}/>
        <Route path="/order_review" element={<ProtectedOrderList Component={OrderList}/>}/>
        <Route path="/payment_method" element={<ProtectedOrderList Component={Payment}/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/manager/login" element={<ManagerLogin/>}/>
        <Route path="/manager/logout" element={<ManagerLogout/>}/>
        <Route path="/manager/dashboard" element={<ProtectedAdmin Component={ManagerDash}/>}/>
        <Route path="/manager/dashboard/category" element={<ProtectedAdmin Component={ManagerCategory}/>}/>
        <Route path="/manager/dashboard/item" element={<ProtectedAdmin Component={ManagerItem}/>}/>
        <Route path="/manager/dashboard/order" element={<ProtectedAdmin Component={ManagerOrder}/>}/>
        <Route path="/manager/user/profile" element={<ProtectedLogin Component={Profile}/>}/>
        <Route path="/user/trackorder" element={<ProtectedLogin Component={TrackOrder}/>}/>
        <Route path="/user/tracklatestorder" element={<ProtectedLogin Component={TrackLatestOrder}/>}/>
        <Route path="*" element={<NotFound/>} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default Main;
