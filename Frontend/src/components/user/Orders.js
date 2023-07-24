import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { FcShipped, FcFactory, FcApproval } from 'react-icons/fc';
import { BiDish } from "react-icons/bi";

const baseUrl = "http://127.0.0.1:8000/user/orders/"

function Orders() {
    let [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [prevUrl, setPrevUrl] = useState([]);
    const [nextUrl, setNextUrl] = useState([]);
    const customerid = Number(localStorage.getItem('userid'));
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getOrders()
    }, []);

    function getOrders() {
        axios({
            method: "GET",
            url: (baseUrl + customerid),
        }).then((response) => {
            setData(response.data.results)
            setPrevUrl(response.data.previous)
            setNextUrl(response.data.next)
            setFlag(true)
        }).catch((error) => {
            if (error) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    };
    console.log(data)

    function paginationHandler(url) {
        try {
            axios.get(url)
                .then((response) => {
                    setNextUrl(response.data.next)
                    setPrevUrl(response.data.previous)
                    setData(response.data.results)
                    console.log(data)
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

    return (
        // maping to get orderid 
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
                                            <div class="text-info">
                                                <BiDish size={30} />Preparing
                                            </div>
                                        </div>
                                    }
                                    {order.status == "dispatched" &&
                                        <div className="col-md-5 ms-2 mb-4">
                                            <div class="text-info">
                                                <FcShipped size={20} />Dispatched
                                            </div>
                                        </div>
                                    }
                                    {order.status == "Delivered" &&
                                        <div className="col-md-4 ms-1 mb-4">
                                            <div class="text-info">
                                                <FcFactory size={30} />Delivered
                                            </div>
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
    )
}

export default Orders;

{/* <div className='card' style={{marign: 'auto'}}>
            <nav aria-label="Page navigation example mt-5">
                <ul className='paginaton justify-content-center'>
                    <li className='page-item'>
                        <button className='page-link'>
                            <i className='bi bi-arrow-left'></i>
                            Previous
                        </button>
                    </li>
                    <li className='page-item'>
                        <button className='page-link'>
                            <i className='bi bi-arrow-right'></i>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            </div> */}

// {data.map((order)=>{
//     <div className='card' style={{ margin: 'auto', width: '400px', marginTop: '25px' }}>    
//         <Button
//             onClick={() => setOpen(!open)}
//             aria-controls="example-collapse-text"
//             aria-expanded={open}
//         >
//             OrderId: {order.id}
//         </Button>
//         <Collapse in={open}>
//             <div id="example-collapse-text">
//                 <Table striped bordered hover size="sm">
//                     <thead>
//                         <tr>
//                             <th>Pic</th>
//                             <th>Item</th>
//                             <th>Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>Mark</td>
//                             <td>Otto</td>

//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>Jacob</td>
//                             <td>Thornton</td>

//                         </tr>

//                     </tbody>
//                 </Table>
//             </div>
//         </Collapse>
//     </div>
//     })}



{/* <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Pic</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                            
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        
                                    </tr>
                                    
                                </tbody>
                            </Table> */}