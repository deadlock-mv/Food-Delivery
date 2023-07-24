import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalEditAddress from './ModalEditAddress';
import ModalAddAddress from './ModalAddAddress';


function AddressSelection(props) {
    const token = localStorage.getItem('token');

    const [address, setAddress] = useState()
    const [edit, setEdit] = useState(false);
    const [editaddress, setEditAddress] = useState([])
    const [add, setAdd] = useState(false);
    
    const [addressAdd, setAddressAdd] = useState(false);
    const user = Number(localStorage.getItem('userid'));

    const editModalClose = () => setEdit(false);
    const addModalClose = () => setAdd(false);

    useEffect(() => {
        getAddress();
    }, [edit, add])

    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function getAddress() {
        axios.get(("http://127.0.0.1:8000/user/address/" + user), config)
            .then((response) => {
                const data = response.data
                setAddress(data)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
    }

    function handleEdit(e, add) {
        e.preventDefault();
        setEdit(true);
        // console.log(add)
        setEditAddress(add)

    }

    function handleAdd(e, add) {
        setAdd(true);
        setAddressAdd(add);
    }

    return (
        <Address {...props}>

            <div className="card" style={{ height: "360px", overflowY: "scroll" }}>
                <div className="card-header">
                    <h5>Address:</h5>
                </div>
                {address && address.map((add, index) =>
                    <div key={index} className='card' style={{ margin: "5px 5px 5px 5px", height: "120px" }}>
                        <div className="card-body">
                            <div className="col-md-8 mb-4">

                                <div className="form-outline row" >
                                    <span className="col-md-10">
                                        <input type="radio" name="id" value={add.id} onClick={(e) => (props.setSelectAddress(e.target.value), props.setFlag(""))} required />
                                        {add.address}
                                    </span>
                                    <span className='col-md-2'>
                                        <Button className="" variant="primary" onClick={(e) => handleEdit(e, add)}><i className="fa-solid fa-pen-to-square"></i> Edit</Button>
                                        {edit &&
                                            <ModalEditAddress show={edit}
                                                onHide={editModalClose}
                                                obj={editaddress} />}

                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>
                )}
                <div className='row col-md-4 ms-2 mb-2'>
                    <Button variant="success" onClick={(e) => handleAdd(e, add)}><i className="fa-regular fa-layer-plus"></i> Add Address</Button>
                    {add &&
                        <ModalAddAddress show={add}
                            onHide={addModalClose} />}

                </div>


            </div>

        </Address>
    )
}

export default AddressSelection;


const Address = styled.div`
    width: 25vw;
    margin-top: 60px !important;
    postion : fixed;
`
