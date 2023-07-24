import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';
import SideBar from "./ManagerSidebar";
import { FcShipped, FcFactory, FcApproval } from 'react-icons/fc';
// import { IoFastFoodOutline } from 'react-icons/io';



export default function ManagerOrder() {
    const token = localStorage.getItem('token');

    let [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [prevUrl, setPrevUrl] = useState([]);
    const [nextUrl, setNextUrl] = useState([]);


    useEffect(() => {
        getOrders()
    }, []
    );

    function getOrders() {
        axios({
            method: "GET",
            url: ("http://127.0.0.1:8000/res-manager/foodorder/"),
        }).then((response) => {
            setData(response.data.results)
            setPrevUrl(response.data.previous)
            setNextUrl(response.data.next)
        }).catch((error) => {
            if (error) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    };

    function paginationHandler(url) {
        try {
            axios.get(url)
                .then((response) => {
                    setNextUrl(response.data.next)
                    setPrevUrl(response.data.previous)
                    setData(response.data.results)
                });
        } catch (error) {
            console.log(error);
        }
    }

    // seting the open variable with id:false pair at beginning for collapsible 
    useEffect(() => {
        let collapse = {}
        for (let key in data) {
            collapse = { ...collapse, [data[key].id]: false }
        }
        setOpen(collapse)
    }, [])

    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function handleDis(e, id) {
        e.preventDefault();
        let formdata = new FormData;
        formdata = {
            id: id,
            status: "dispatched"
        }
        axios.put(("http://127.0.0.1:8000/res-manager/foodorder/" + id), formdata, config)
            .then(() => {
                // alert("dispatch updated");
                getOrders();
            })
    }

    function handleDelivery(e, id) {
        e.preventDefault();
        let formdata = new FormData;
        formdata = {
            id: id,
            status: "Delivered"
        }
        axios.put(("http://127.0.0.1:8000/res-manager/foodorder/" + id), formdata, config)
            .then(() => {
                // alert("Order Delivered");
                getOrders();
            })
    }

    return (
        <ParentContainer >
            <SideBar />
            <BodyContainer>
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
                </head>
                <div className="card p-5" >
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                        {/* // maping to get orderid */}
                        <div>
                            {data && data.map((order) =>
                                <div className='card' style={{ margin: 'auto', width: '400px', marginTop: '25px' }}>
                                    <Button
                                        onClick={() => setOpen(open => ({ ...open, [order.id]: !open[order.id] }))}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open[order.id]}
                                    >
                                        OrderId: {order.id}
                                    </Button>
                                    <Collapse in={open[order.id]}>
                                        <div id="example-collapse-text">
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Pic</th>
                                                        <th>Item</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                {/* filling up the table with order items  */}
                                                {order.orderitem.map((item) =>
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
                                            <div className="p-3 mb-2 bg-dark text-white">
                                                <div className="row" >

                                                    <div className="col-md-3 ms-2 mb-4">
                                                        status:
                                                    </div>
                                                    {order.status == "preparing" &&
                                                        <div className="col-md-4 ms-2 mb-4">
                                                            <Button variant="outline-info" style={{ marginLeft: '5px' }} onClick={(e) => handleDis(e, order.id)}>
                                                                <FcShipped size={20} />dis</Button>
                                                        </div>
                                                    }
                                                    {order.status == "dispatched" &&
                                                        <div className="col-md-4 ms-2 mb-4">
                                                            <Button variant="outline-info" style={{ marginLeft: '5px' }} onClick={(e) => handleDelivery(e, order.id)}><FcFactory size={20} />delivered</Button>
                                                        </div>
                                                    }
                                                    {order.status == "Delivered" &&
                                                        <div className="col-md-2 ms-1 mb-4">
                                                            <FcApproval size={30}>delivered</FcApproval>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            )}

                            {/* pagination start */}
                            <div style={{ marginTop: '10px' }} >
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {prevUrl &&
                                            <li className="page-item"><button className="page-link" onClick={() => paginationHandler(prevUrl)} ><i className="bi bi-arrow-bar-left"></i>Previous</button></li>
                                        }

                                        {nextUrl &&
                                            <li className="page-item"><button className="page-link" onClick={() => paginationHandler(nextUrl)}>Next<i className="bi bi-arrow-bar-right"></i></button></li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                            {/* pagination end */}
                        </div>
                    </div>
                </div>

            </BodyContainer>

        </ParentContainer>
    )
}

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
    marign-right : 100px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`