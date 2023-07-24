import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import SideBar from "./ManagerSidebar";
import ModalEditCategory from "./ModalEditCategory";
import ModalAddCategory from "./ModalAddCategory";
// import "./CSS/image.css"

export default function ManagerCategory() {
    const token = localStorage.getItem('token');

    const [category, setCategory] = useState();
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(0);


    const editModalClose = () => setEdit(false);
    const addModalClose = () => setAdd(false);

    useEffect(() => {
        getCategory()
    }, [add, edit]);

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

    function handleChange(e) {
        if (e.target.value != "cac") {
            setFlag(true)
        } else {
            setFlag(false)
        }
        setId(e.target.value)
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data',Authorization : `Bearer ${token}`}}
    function handleDelete(e) {
        axios.delete(("http://127.0.0.1:8000/res-manager/category/" + id), config)
            .then(() => {
                // alert("Deleted Successfully");
                getCategory();
            })
            .catch((error) => {
                console.log(error.response)
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
                        <div className='row' style={{ height: '100px' }}>
                            <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                                Category
                                <span>&nbsp; &nbsp;</span>
                                <select name='categoryid' value={category && category.categoryname} onChange={handleChange} required>
                                    <option value="cac">Choose a Category</option>
                                    {category && category.map((ct) => (
                                        <option key={ct.id} value={ct.id}>{ct.categoryname}</option>
                                    ))}
                                </select>
                                {flag &&
                                    <><Button variant="primary" style={{ marginLeft: '20px' }} onClick={() => setEdit(true)}><i class="fa-solid fa-pen-to-square"></i> Edit</Button>
                                        {edit &&
                                            <ModalEditCategory show={edit}
                                                onHide={editModalClose}
                                                load = {getCategory}
                                                id={id} />}

                                        <Button variant="secondary" style={{ marginLeft: '20px' }} onClick={(e) => handleDelete(e)}><i class="fa-solid fa-trash"></i> Del</Button>
                                    </>
                                }
                            </div>

                        </div>
                        <div className='row'>
                            <Button variant="success" onClick={() => setAdd((true))}><i class="fa-regular fa-layer-plus"></i> Add Category</Button>
                            {add &&
                                <ModalAddCategory show={add}
                                    onHide={addModalClose} />}

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


// background-image: url(${manager_background});
// box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;