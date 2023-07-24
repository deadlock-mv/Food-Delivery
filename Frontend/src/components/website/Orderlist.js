import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import AddressSelection from "../user/AddressSelection";


function OrderList(props) {
    const location = useLocation();
    // console.log(location);
    let data = location.state?.data;
    // console.log(data);
    const customerid = Number(localStorage.getItem('userid'));

    const [selectaddress, setSelectAddress] = useState();
    const [flag, setFlag] = useState("disabled");
    const [order, setOrder] = useState({});

    // const handleAddress = (e) =>{ setSelectAddress(e); console.log(selectaddress);}
    useEffect(() => {
       let updateorder = {
            customerid: customerid,
            totalamount: total,
            address: selectaddress,
        }
        setOrder(updateorder);
        // console.log(order)
    }, [selectaddress])


    let total = 0;

    for (let key in data) {
        total += data[key][2];
    }

    // let order = {
    //     customerid: customerid,
    //     total: total,
    // }
    // console.log(order);

    let orderlist = [];
    for (let key in data) {
        orderlist.push({
            itemid: key,
            quantity: data[key][1],
            orderid: '',
        });
    };
    // console.log(orderlist);


    return (
        <ParentContainer>
            <BodyContainer>
                <div className="container " style={{ width: "600px" }}>
                    <div className="card text-center">
                        <div className="card-header">
                            Review Order
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text"></p>
                            <table class="table table-hover">
                                <thead>
                                    <tr>

                                        <th scope="col">Items</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data).map(([key, [name, quantity, price]]) => (
                                        <tr key={key}>


                                            <td>{name}</td>
                                            <td>{price}</td>
                                            <td>{quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer text-muted" onClick={()=> console.log(order)}>
                            <p>Grand Total: {total} </p>
                            <Link to="/payment_method" state={{ data: order, list: orderlist }} className={`btn btn-primary ${flag}`}>Payment</Link>
                        </div>
                    </div>
                </div>
            </BodyContainer>

            <AddressSelection setSelectAddress={setSelectAddress} setFlag={setFlag} />

        </ParentContainer>
    );
};

export default OrderList;


const ParentContainer = styled.div`
    position : relative;
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    margin : auto;
`

const BodyContainer = styled.div`
    width: 45vw;
    margin-top : 4rem;
`
