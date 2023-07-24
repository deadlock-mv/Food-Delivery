import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FcShipped, FcFactory, FcApproval } from 'react-icons/fc';
import { BiDish } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';


const baseUrl = "http://127.0.0.1:8000/user/orders/status/"

function TrackOrder() {
    const [order, setOrder] = useState();
    const location = useLocation();
    // console.log(location.state.data)
    const orderid = location.state?.data;
    console.log(orderid)

    useEffect(() => {
        function getOrders() {
            axios({
                method: "GET",
                url: (baseUrl + orderid),
            }).then((response) => {
                console.log(response.data)
                setOrder(response.data)
            }).catch((error) => {
                if (error) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
        };

        getOrders(); // call the function here

    }, [orderid]);

    // function getOrders() {
    //     axios({
    //         method: "GET",
    //         url: (baseUrl + orderid),
    //     }).then((response) => {
    //         console.log(response.data)
    //         setOrder(response.data)
    //     }).catch((error) => {
    //         if (error) {
    //             console.log(error.response);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //         }
    //     })
    // };


    return (
        <div className="" style={{ width: "500px", margin: "auto", marginTop: "50px" }}>
            <Alert variant="success">
                OrderID: {order && order.id} 
            </Alert>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Pic</th>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {/* filling up the table with order items  */}
                {order && order.orderitem.map((item) =>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ marign: 'auto' }}>
                                    <img src={item.itemid.image} style={{ height: '60px', width: '60px', borderRadius: '8px' }} alt="loading" />
                                </div>
                            </td>
                            <td>{item.itemid.itemname}</td>
                            <td>{item.quantity}</td>

                        </tr>
                    </tbody>
                )}
                {/* end of filling order items  */}
            </Table>
            <div className="p-3 mb-2  text-white">
                <div className="row" >

                    {/* <div className="col-md-3 ms-2 mb-4">
                        status:
                    </div> */}
                    {order && order.status == "preparing" &&
                        <div className="col-md-4 ms-2 mb-4">
                            <div class="text-info">
                                <BiDish size={30} />Preparing
                            </div>
                            <Card.Img style={{ width: "100px", height: "100px", borderRadius: "5px" }} src="/food_prep.gif" alt="Card image" />
                        </div>
                    }
                    {order && order.status == "dispatched" &&
                        <div className="col-md-5 ms-2 mb-4">
                            <div class="text-info">
                                <FcShipped size={20} />Dispatched
                            </div>
                            <Card.Img style={{ width: "150px", height: "100px", borderRadius: "5px" }} src="/food_dispatched.gif" alt="Card image" />
                        </div>
                    }
                    {order && order.status == "Delivered" &&
                        <div className="col-md-4 ms-1 mb-4">
                            <div class="text-info">
                                <FcFactory size={30} />Delivered
                            </div>
                            <Card.Img style={{ width: "150px", height: "100px", borderRadius: "5px" }} src="/food_delivered.gif" alt="Card image" />
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}

export default TrackOrder;

const ParentContainer = styled.div`
    position : relative;
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    margin : auto;
`