import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalAddItem(props) {
    const token = localStorage.getItem('token');

    const [category, setCategory] = useState();
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState({
        itemname: "",
        price: "",
        image: "",
    })

    const [error, setError] = useState({});

    function handleCategoryChange(e) {
        if (e.target.value != "cac") {
            setFlag(true);
            const newdata = { ...data };
            newdata[e.target.name] = e.target.value;
            setData(newdata);
        } else {
            setFlag(false);
        }
    }

    function handleChange(e) {
        const newdata = { ...data };
        newdata[e.target.name] = e.target.value;
        const isValidated = validate(newdata)
        setData(newdata);
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        const isValidated = validate(newdata)
        setData(newdata)

    }

    useEffect(() => {
        getCategory()
    }, []);

    function getCategory() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/res-manager/category/",
        }).then((response) => {
            const data = response.data
            setCategory(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    }

    const validate = (values) =>{
        const errors = {}
        const regex_name = /^[a-zA-Z ]+$/
        const regex_number = /^\d*[1-9]\d*$/
        if(!values.itemname){
            errors.itemname = "Category Required!"
        }else if (!regex_name.test(values.itemname)){
            errors.itemname = "Should contain only and atleast one of [a-z, A-z]!"
        }
        if(!values.price){
            errors.price = "Price Required!"
        }else if(!regex_number.test(values.price)){
            errors.price = "Should contain only [0-9]!"
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
            axios.post(("http://127.0.0.1:8000/res-manager/item/"), data, config)
                // .then(alert("submitted successfully"))
                .catch((error) => {
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
                    Item Addition Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please Fill The Form: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                            Category
                            <span>&nbsp; &nbsp;</span>
                            <select name='category' value={category && category.categoryname} onChange={(e) => handleCategoryChange(e)} >
                                <option value="cac">Choose a Category</option>
                                {category && category.map((ct) => (
                                    <option key={ct.id} value={ct.id}>{ct.categoryname}</option>
                                ))}
                            </select>
                            <div className="row mt-3" style={{height:"400px"}}>
                            {flag && <>                                    
                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleChange(e)} type="text" name="itemname" placeholder='Item Name'  className="form-control form-control-lg" />
                                    {error && <span><code>{error.itemname}</code></span>}
                                </div>

                            </div>
                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleChange(e)} type="text" name="price" placeholder='Price' className="form-control form-control-lg" />
                                    {error && <span><code>{error.price}</code></span>}
                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleImage(e)} type="file" name="image" className="form-control form-control-lg" />
                                    {error && <span><code>{error.image}</code></span>}
                                </div>

                            </div>

                            <div className="mt-2 pt-1">
                                <input className="btn btn-success btn-md" type="submit" value="Submit" />
                            </div>
                            </>}
                            </div>
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

export default ModalAddItem;