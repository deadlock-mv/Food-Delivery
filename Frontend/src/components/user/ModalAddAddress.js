import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalAddAddress(props) {
    const user = Number(localStorage.getItem('userid'));
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        user: user,
    })

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }



    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function onSubmit(e) {
        e.preventDefault();
        axios.post(("http://127.0.0.1:8000/user/address/" + user), data, config)
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
                    Address Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please Fill The Form: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)}  type="number" name="phone" required className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Mob Number</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)}  type="number" name="pincode" required className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Pin</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e) => handleChange(e)}  type="text" name="address" required className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Address</label>
                            </div>

                        </div>
                        <div className="mt-2 pt-1">
                            <input className="btn btn-success btn-md" type="submit" value="Add" />
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

export default ModalAddAddress;