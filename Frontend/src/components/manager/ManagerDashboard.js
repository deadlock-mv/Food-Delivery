import { Link } from "react-router-dom";
import styled from 'styled-components';
import SideBar from "./ManagerSidebar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Chart } from 'primereact/chart';

export default function ManagerDash() {
    const token = localStorage.getItem('token');
    const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }

    const [salesData, setSalesData] = useState({});
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    // function getSales() {
    //     axios.get("http://127.0.0.1:8000/res-manager/sales/", config)
    //         .then((res) => {
    //             // console.log(res.data[0])
    //             setSalesData(res.data);
    //         })
    // }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/res-manager/sales/", config)
            .then((res) => {
                console.log(res.data)
                setSalesData(res.data);
            })
    }, [])


    useEffect(() => {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Sales',
                    data: [],
                    backgroundColor: [
                        'rgba(9, 232, 264, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(9, 232, 264)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 5
                }
            ]
        };
        // console.log(salesData)
        for (let i = 0; i < salesData.length; i++) {
            data.labels.push(salesData[i].orderdate);
            data.datasets[0].data.push(salesData[i].total_created)
        }

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [salesData]);

    return (
        <ParentContainer >
            <SideBar />
            <BodyContainer>

                <div className="card p-5" >


                    <Chart type="bar" data={chartData} options={chartOptions} />

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