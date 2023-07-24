import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalEditCategory(props) {
    const token = localStorage.getItem('token');
    // console.log(props.id)

    const [imageValidator, setimageValidator] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState({
        categoryname: "",
    })

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        const isValidImage = validate(newdata.image)
        if(isValidImage){
            setData(newdata)
            setError(false)
        }else{
            setError("Only jpg/jpeg and png files are allowed!");
            console.log(error)
        }

    }

    const validate = (values) => {
        console.log(values.name)
        const filename = values.name
        var idxDot = filename.lastIndexOf(".") + 1;
        var extFile = filename.substr(idxDot, filename.length).toLowerCase();
        return (extFile=="jpg" || extFile=="jpeg" || extFile=="png")
    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data',Authorization : `Bearer ${token}`}}
    function onSubmit(e) {
        e.preventDefault();
        if (!error){
            axios.put(("http://127.0.0.1:8000/res-manager/category/" + props.id), data, config)
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
                    Category Edit Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Present Category: </h5>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleChange(e)} type="text" name="categoryname" required className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Cateogry Name</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                            <span>{error && <code>{error}</code>}</span>
                                <input onChange={(e)=>(setError(false),handleImage(e))}  type="file" name="image" 
                                    accept="image/png, image/gif, image/jpeg" 
                                    className="form-control form-control-lg" />
                                <label className="form-label" for="lastName">Image</label>
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

export default ModalEditCategory;