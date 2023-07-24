import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalEditItem(props) {
    const token = localStorage.getItem('token');

    console.log(props.id)
    const [data, setData] = useState({});
    const [error, setError] = useState({
        itemname: "",
        price:"",
        image:"",
    });
    const [flagError, setFlagError] = useState(true);

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        const isValidated = validate(newdata)
        setData(newdata)
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        const isValidImage = imageValidate(newdata)
        setData(newdata)
    }

    const validate = (values) =>{
        const errors = {...error}
        let validateflag = false;
        const regex_name = /^[a-zA-Z ]+$/
        const regex_number = /^\d*[1-9]\d*$/
        if(!values.itemname){
            errors.itemname = "Item Required!"
        }else if (!regex_name.test(values.itemname)){
            errors.itemname = "Should contain only and atleast one of [a-z, A-z]!"
        }else {errors.itemname = ""}
        if(!values.price){
            errors.price = "Price Required!"
        }else if (!regex_number.test(values.price)){
            errors.price = "Should only be + digits [0-9]!"
        }else {errors.price = ""}
        setError(errors)
        console.log(errors)
        for (var key in errors) {
            if (errors[key] !== null && errors[key] != ""){
                validateflag = true;
                break;
            }
        }
        console.log(validateflag)
        if (validateflag){
            setFlagError(true)
            return false
        } else{
            setFlagError(false)
            return true
        }
    }

    const imageValidate = (values) => {
        // console.log(values.image.name)
        if(values.image.name){
            const errors = {...error}
            const filename = values.image.name
            var idxDot = filename.lastIndexOf(".") + 1;
            var extFile = filename.substr(idxDot, filename.length).toLowerCase();
            errors.image = ""
            setError(errors)
            if(!(extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
                errors.image = "Only jpg/jpeg and png files are allowed!"
                setError(errors);
                setFlagError(true);
                return false;
            }
        }
        setFlagError(false)
        return true;
    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function onSubmit(e) {
        e.preventDefault();
        // console.log(data);
        const isValidated = (validate(data) && imageValidate(data));
        console.log(validate(data))
        if(isValidated){
            axios.put(("http://127.0.0.1:8000/res-manager/item/" + props.id), data, config)
            // .then(alert("submitted successfully"))
            .catch((error)=>{
                console.log(error.response)
            })
            props.load();
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
                    Item Edit Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Present Item: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleChange(e)} type="text" name="itemname" placeholder="Item Name" className="form-control form-control-lg" />
                                {flagError && <span><code>{error.itemname}</code></span>}
                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleChange(e)}  type="number" name="price" placeholder="Price"className="form-control form-control-lg" />
                                {flagError && <span><code>{error.price}</code></span>}
                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleImage(e)}  type="file" name="image" className="form-control form-control-lg" />
                                {flagError && <span><code>{error.image}</code></span>}
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

export default ModalEditItem;