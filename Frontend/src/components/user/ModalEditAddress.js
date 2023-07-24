import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalEditAddress(props) {
    const userid = Number(localStorage.getItem('userid'));
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        user: userid,
    })
    
    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function onSubmit(e) {
        e.preventDefault();
        axios.put(("http://127.0.0.1:8000/user/address/" + props.obj.id), data)
            // .then(alert("submitted successfully"))
            .catch((error) => {
                console.log(error.response)
            })
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Address Edit Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Present Address: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)} placeholder={props.obj.phone} type="number" name="phone" className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Mob Number</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)} placeholder={props.obj.pincode} type="number" name="pincode" className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Pin</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)} placeholder={props.obj.address} type="text" name="address" className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Address</label>
                            </div>

                        </div>
                        <div className="mt-2 pt-1">
                            <input className="btn btn-success btn-md" type="submit" value="Appy Changes" />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditAddress;