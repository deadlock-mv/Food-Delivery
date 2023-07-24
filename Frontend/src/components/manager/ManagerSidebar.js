import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function SideBar() {
    return (
        <SideMenu>

            <div class="position-fixed" 
                style={{ width: "20vw", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                <div className="card menuSidebar">
                    <h5 className="card-header"><Link className='list-group-item' to='/manager/dashboard'>Dashboard</Link></h5>
                    <div id="list-example" className="list-group list-group-flush">
                        <Link to='/manager/dashboard/category' className='list-group-item list-group-item-action text-muted'>Category/Cuisines</Link>
                        <Link to='/manager/dashboard/item' className='list-group-item list-group-item-action text-muted'>Items</Link>
                        <Link to='/manager/dashboard/order' className='list-group-item list-group-item-action text-muted'>Orders</Link>
                    </div>
                </div>
            </div>

        </SideMenu>
    );
}


const SideMenu = styled.div`
    display : block;
    width : 20vw;
    margin-left: 20px;
    margin-top: 60px !important;
    
`

{/* <div className="card">
<div className='card-header'>Dashboard</div>
<div className="list-group list-group-flush">
    <Link to='/manager/category' className='list-group-item list-group-item-action text-muted'>Category/Cuisines</Link>
    <Link to='/manager/item' className='list-group-item list-group-item-action text-muted'>Items</Link>
    <Link to='/manager/orders' className='list-group-item list-group-item-action text-muted'>Orders</Link>
</div>
</div> */}

// {
//     padding: 10px;
//     background: rgb(229,228,252);
//     background: linear-gradient(
//   38deg
//   , rgba(229,228,252, 1), rgb(255 255 255) 51%);
//     border-radius: 10px;
//     box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
//     margin-bottom: 20px;
//   }