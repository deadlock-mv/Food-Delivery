import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import SideBar from "./ManagerSidebar";
import ModalEditItem from "./ModalEditItem";
import ModalAddItem from "./ModalAddItem";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function ManagerItem() {
    const token = localStorage.getItem('token');

    const [item, setItem] = useState();
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(0);

    const [radioValue, setRadioValue] = useState();
    const radios = [
        { name: 'Active', value: 'true' },
        { name: 'Inactive', value: 'false' }
      ];
    

    const editModalClose = () => setEdit(false);
    const addModalClose = () => setAdd(false);

    useEffect(() => {
        getItem()
    }, [edit, add, radioValue]);

    function getItem() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/res-manager/item/",
        }).then((response) => {
            const data = response.data
            setItem(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
    
    function handleChange(e) {
        // console.log(e.target.value)
        const value = e.target.value.split(',');
        if (e.target.value != "cac") {
            setFlag(true)
        } else {
            setFlag(false)
        }
        setId(value[0])
        setRadioValue(value[1])
        // console.log(value[0], value[1])
    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function handleDelete(e) {
        axios.delete(("http://127.0.0.1:8000/res-manager/item/" + id), config)
            .then(() => {
                // alert("Deleted Successfully");
                getItem();
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    function handleActivity(e){
        console.log(e.target.value)
        const data = {status: e.target.value}
        axios.put(("http://127.0.0.1:8000/res-manager/item/" + id), data, config)
        .then(() => {getItem();})
        // .then(alert("submitted successfully"))
        .catch((error)=>{
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
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                        <div className='row' style={{ height: '100px' }}>
                            <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                                Items
                                <span>&nbsp; &nbsp;</span>
                                <select name='itemid' value={item && item.itemname} onChange={handleChange} required>
                                    <option value="cac">Choose a item</option>
                                    {item && item.map((it) => (
                                        <option key={it.id} value={`${it.id},${it.status}`}>{it.itemname}</option>
                                    ))}
                                </select>
                                {flag &&
                                    <><Button variant="primary" style={{ marginLeft: '20px' }} onClick={() => setEdit(true)}><i class="fa-solid fa-pen-to-square"></i> Edit</Button>
                                        {edit &&
                                            <ModalEditItem show={edit}
                                                onHide={editModalClose}
                                                id={id}
                                                load={getItem} />}

                                        <Button variant="secondary" style={{ marginLeft: '20px' }} onClick={(e) => handleDelete(e)}><i class="fa-solid fa-trash"></i> Del</Button>

                                        <ButtonGroup style={{ marginLeft: '20px' }}>
                                            {radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                                    name="radio"
                                                    value={radio.value}
                                                    checked={radioValue === radio.value}
                                                    onChange={(e) => (setRadioValue(e.currentTarget.value), handleActivity(e))}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>

                                    </>
                                }
                            </div>

                        </div>
                        <div className='row'>
                            <Button variant="success" onClick={() => setAdd((true))}><i class="fa-regular fa-layer-plus"></i> Add Item</Button>
                            {add &&
                                <ModalAddItem show={add}
                                    onHide={addModalClose}
                                />}

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