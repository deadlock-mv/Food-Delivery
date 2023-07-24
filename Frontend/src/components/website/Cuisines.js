import { render } from "react-dom";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import '../CSS/cuisine_disabled.css'
// import "primeicons/primeicons.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css"; 
// import "primereact/resources/primereact.min.css";
import { Link as ScrollLink, Events, animateScroll as scroll } from 'react-scroll';
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';


function Cuisines() {
    // const paramid = useParams();
    // console.log(paramid);
    const [data, setData] = useState({});
    const [total, setTotal] = useState();
    const [cuisine, setCuisine] = useState([]);
    const loginstatus = localStorage.getItem('loginstatus');
    const [activeLink, setActiveLink] = useState('');
    const [sectionPositions, setSectionPositions] = useState({});
    const [value, setValue] = useState("");

    // using for getting data from api 
    useEffect(() => {
        getCuisine()
    }, []);

    // using for calculating total after each update 
    useEffect(() => {
        let amt = 0;

        for (let key in data) {
            amt += data[key][2];
            if (data[key][2] == 0) {
                let deldata = data;
                delete deldata[key];
                setData(deldata);
            }
        }

        setTotal(amt);
    }, [data]);

    // getting data from api 
    function getCuisine() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/Category/",
        }).then((response) => {
            const data = response.data
            setCuisine(data)
            let temp = {}
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].items.length; j++) {
                    // console.log(data[i].items[j])
                    temp = { ...temp, [data[i].items[j].id]: 0 }
                }
            }

            setValue(temp)

        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    }

    // updating dataset named 'data' with objects of type [id: quantity, value] pair after each click 
    let handleInput = (event, itemlist) => {
        let amt = 0;
        const key = itemlist.id;
        const name = itemlist.itemname;
        const quantity = Number(event.target.value);
        const val = (itemlist.price) * quantity;
        setData(prevData => {
            const updatedData = { ...prevData, [key]: [name, quantity, val] };
            Object.entries(updatedData).forEach(([key, value]) => console.log(`${key}: ${value}`));
            return updatedData;
        });
    }

    let handleKnobAdd = (event, itemlist) => {
        let amt = 0;
        const key = itemlist.id;
        const name = itemlist.itemname;
        const quantity = value[itemlist.id] + 1;
        const val = (itemlist.price) * quantity;

        console.log(value)

        setData(prevData => {
            const updatedData = { ...prevData, [key]: [name, quantity, val] };
            Object.entries(updatedData).forEach(([key, value]) => console.log(`${key}: ${value}`));
            return updatedData;
        });
    }

    let handleKnobMinus = (event, itemlist) => {
        let amt = 0;
        const key = itemlist.id;
        const name = itemlist.itemname;
        const quantity = value[itemlist.id] - 1;
        const val = (itemlist.price) * quantity;

        console.log(value)

        setData(prevData => {
            const updatedData = { ...prevData, [key]: [name, quantity, val] };
            Object.entries(updatedData).forEach(([key, value]) => console.log(`${key}: ${value}`));
            return updatedData;
        });
    }



    useEffect(() => {
        Events.scrollEvent.register('begin', function () { });
        Events.scrollEvent.register('end', function () { });
        window.addEventListener('scroll', handleScroll);
        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const positions = Object.values(sectionPositions).map((ref) => ref.offsetTop - 100);
        const currentScrollPosition = window.scrollY;
        const currentSectionIndex = positions.findIndex((pos) => pos > currentScrollPosition);
        const newActiveLink = currentSectionIndex === -1 ? Object.keys(sectionPositions)[Object.keys(sectionPositions).length - 1] : Object.keys(sectionPositions)[currentSectionIndex];
        setActiveLink(newActiveLink);
    };



    // sidebar Styling
    const sidebar = {
        height: "200px",
        width: "600px",
        position: "fixed",
        top: 80,
        left: 0,
        paddingtop: "40px",
        backgroundcolor: "lightblue",
        margin: "20px"

    };

    

    return (

        <ParentContainer >

            {/* sidebar def */}
            <SideMenu>

                <div class="position-fixed" style={{ width: "20vw", boxShadow: `rgb(38, 57, 77) 0px 20px 30px -10px` }}>
                    <div className="card menuSidebar" style={{ backgroundColor: "#f9bbc7" }}>
                        <h5 className="card-header" style={{ backgroundColor: "#fcf1ab" }}>Menu</h5>
                        <div id="list-example" className="list-group list-group-flush">

                            {/* Menu tab for loop populating */}
                            {cuisine.map((menu) => (
                                <ScrollLink activeClass="active" spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500} to={"list-item-" + menu.id}
                                    active={activeLink === menu.id.toString()}
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 20px",
                                        color: "red",
                                        borderRadius: "5px",
                                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        transition: "background-color 0.3s ease-in-out",
                                        cursor: "pointer"
                                    }}>{menu.categoryname} </ScrollLink>
                            ))}

                        </div>
                    </div>
                </div>

            </SideMenu>
            {/* sidebar def end */}

            {/* main body items  */}
            <BodyContainer>

                <div className="card p-5" >
                    <div >

                        {/* populating order list table */}
                        {cuisine.map((menu, idx) => (
                            <section id={"list-item-" + menu.id} ref={(ref) => { sectionPositions[menu.id] = ref }}>
                                <h4 >{menu.categoryname}</h4>
                                <table class="table table-hover" >
                                    <thead>
                                        <tr>

                                            <th scope="col" style={{ width: '10%' }}>Item_Pic</th>
                                            <th scope="col" style={{ width: '30%' }}>Items</th>
                                            <th scope="col" style={{ width: '10%' }}>Price</th>
                                            <th scope="col" style={{ width: '10%' }}>Quantity</th>
                                        </tr>
                                    </thead>
                                    {menu.items.map((itemlist) => (
                                        <tbody >
                                            <tr className={!itemlist.status && "cuisinedisabled"} onScroll={handleScroll}>

                                                <td>
                                                    <div style={{ marign: 'auto' }}>
                                                        <img src={itemlist.image} style={{ height: '60px', width: '60px', borderRadius: '8px' }} alt="loading" />
                                                    </div>
                                                </td>
                                                <td>{itemlist.itemname}</td>
                                                <td>{itemlist.price}</td>
                                                <td><div value={itemlist} className="card flex flex-column align-items-center gap-2">
                                                    <Knob value={value[itemlist.id]}
                                                        max={5} min={0} size={75} textColor="#880586"
                                                        valueColor="#C80A0A" rangeColor="#48d1cc" />
                                                    <div className="mb-2">
                                                        <Button icon="pi pi-plus" style={{ width: "25px", height: "25px" }}
                                                            onClick={(e) => (setValue(value => ({ ...value, [itemlist.id]: value[itemlist.id] + 1 })), handleKnobAdd(e, itemlist))}
                                                            id={itemlist} name={itemlist.id}
                                                            disabled={value[itemlist.id] === 5} /><span>&nbsp;&nbsp;</span>
                                                        <Button icon="pi pi-minus" style={{ width: "25px", height: "25px" }}
                                                            onClick={(e) => (setValue(value => ({ ...value, [itemlist.id]: value[itemlist.id] - 1 })), handleKnobMinus(e, itemlist))}
                                                            id={itemlist} name={itemlist.id}
                                                            disabled={value[itemlist.id] === 0} />
                                                    </div>
                                                    {/* <input type="number" min='0' max='5' size="2" id={itemlist} name={itemlist.id}
                                                        onChange={(e) => handleInput(e, itemlist)} required disabled={!itemlist.status && "cuisinedisabled"} /> */}
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </section>
                        ))}
                        {/* populating order list table end */}

                    </div>
                </div>

                {/* main body items end  */}
            </BodyContainer>

            {/* Total Card -- total is counted on each update  */}
            <CheckOutContainer>
                <div class="position-fixed" style={{ width: "20vw", boxShadow: `rgb(38, 57, 77) 0px 20px 30px -10px` }}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Total Amount</h5>
                        </div>
                        {loginstatus == 'true' &&
                            <div className="card-body">
                                <h5 className="card-title">{total}</h5>
                                <Link to="/order_review" state={{ data: data }} className="btn btn-primary">Place Order</Link>
                            </div>
                        }
                        {loginstatus != 'true' &&
                            <div className="card-body">
                                <h5 className="card-title">{total}</h5>
                                <Link to="/login" className="btn btn-primary">Login to Order</Link>
                            </div>
                        }
                    </div>
                </div>
            </CheckOutContainer>
            {/* </div> */}
        </ParentContainer>

    );
}

export default Cuisines;

//declaring styled components

const SideMenu = styled.div`
    display : block;
    width : 20vw;
    margin-left: 20px;
    margin-top: 60px !important;
`

const ParentContainer = styled.div`
    position : relative;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
`

const BodyContainer = styled.div`
    width: 45vw;
    margin-top : 4rem;
`

const CheckOutContainer = styled.div`
    width: 22vw;
    margin-top: 60px !important;
    postion : fixed;
`

