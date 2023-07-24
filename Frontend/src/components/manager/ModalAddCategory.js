import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalAddCategory(props) {
    const token = localStorage.getItem('token');
    
    const [data, setData] = useState({
        categoryname: "",
        image:"",
    });
    const [error, setError] = useState({});

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        const isValidated = validate(newdata)
        setData(newdata);
        
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        const isValidated = validate(newdata)
        setData(newdata);
    }

    const validate = (values) =>{
        const errors = {}
        const regex_name = /^[a-zA-Z ]+$/
        if(!values.categoryname){
            errors.categoryname = "Category Required!"
        }else if (!regex_name.test(values.categoryname)){
            errors.categoryname = "Should contain atleast one of [a-z, A-z]!"
        }
        if (!values.image){
            errors.image = "Image Required"
        }else {
            const filename = values.image.name
            var idxDot = filename.lastIndexOf(".") + 1;
            var extFile = filename.substr(idxDot, filename.length).toLowerCase();
            if(!(extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
                errors.image = "Only jpg/jpeg and png files are allowed!"
            }
        }
        setError(errors)
        console.log(errors)
        return errors;
    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function onSubmit(e) {
        e.preventDefault();
        const isValidated = validate(data)
        if(Object.keys(isValidated).length == 0){
        axios.post(("http://127.0.0.1:8000/res-manager/category/"), data, config)
        // .then(alert("submitted successfully"))
        .catch((error)=>{
            console.log(error.response)
        })
        props.onHide();
        }
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
                    Category Addition Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please Fill The Form: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleChange(e)} type="text" name="categoryname"  className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Cateogry Name</label>
                                {error && <span><code>{error.categoryname}</code></span>}
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleImage(e)}  type="file" name="image" className="form-control form-control-lg" />
                                <label className="form-label" for="lastName">Image</label>
                                {error && <span><code>{error.image}</code></span>}
                            </div>

                        </div>
                        <div className="mt-2 pt-1">
                            <input className="btn btn-success btn-md" type="submit" value="Submit" />
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

export default ModalAddCategory;