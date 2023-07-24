import { useLocation } from "react-router-dom";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Payment() {
    var orderid;
    const token = localStorage.getItem('token');

    const location = useLocation();
    const data = location.state?.data;
    const list = location.state?.list;
    console.log(data);
    console.log(list);
    const navigate = useNavigate()

    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${token}`}}
    function handleClick(e) {
        e.preventDefault();
        try {
            axios.post("http://127.0.0.1:8000/Order-items/", data, config)
            .then((res) => {
                let id = res.data 
                orderid = res.data 
                for (let key in list) {
                        list[key].orderid = id
                    };
                    try{
                    axios.post("http://127.0.0.1:8000/ordlist/",list)
                } catch (error) {
                    console.log(error)
                }
            }).then(()=>{
                // navigate('/orders')
                navigate('/user/trackorder', {state:{data:orderid}})
            })

        } catch (error) {
            console.log(error);

        }
    }
    return (


        <div style={{ width: "18rem", height: '400px', margin: 'auto', marginTop:'50px' }}>
            <ListGroup>
                
                <ListGroup.Item onClick={(e) => handleClick(e)} action variant="primary">UPI</ListGroup.Item>
                
                <ListGroup.Item action variant="warning" onClick={(e) => handleClick(e)}>Debit/Credit Card</ListGroup.Item>
                
                <ListGroup.Item action variant="success" onClick={(e) => handleClick(e)}>Netbanking</ListGroup.Item>
                
                <ListGroup.Item action variant="danger" onClick={(e) => handleClick(e)}>Wallets</ListGroup.Item>
                
            </ListGroup>
        </div>



    );

}; 