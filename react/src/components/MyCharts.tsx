import {useEffect, useRef, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Col, Container, Grid, Row,Card,Text} from "@nextui-org/react";
import dateformat from 'dateformat';

Chart.register(...registerables);

let labels:any = [];
let datasets:any = [];
var dataTmp2 = {
    labels: labels,
    datasets: [
        {
            data: datasets,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },
    ],
}
var dataTmp = {
    labels: labels,
    datasets: [
        {
            data: datasets,
        },
    ],
}

const options = {
    maintainAspectRatio: false,
    responsive:true,// Set to false to allow resizing
    scales: {
        y: {
            beginAtZero: true,
        },
    },
    elements: {
        line: {
            tension: 0,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Wykres zużytej energii przez ostatnie 30 dni',
            font: {
                size: 20,
            },
        },
    },
};

const options2 = {
    maintainAspectRatio: false,
    responsive:true,// Set to false to allow resizing
    scales: {
        y: {
            beginAtZero: true,
        },
    },

    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Wykres 5 największych konsumentów energii',
            font: {
                size: 20,
            },
        },
    },
}


function MyCharts() {
    const [optionsState, setOptionsState] = useState(options);
    const [dataState, setDataState] = useState(dataTmp);
    const [dataState2, setDataState2] = useState(dataTmp2);
    const [optionsState2, setOptionsState2] = useState(options2);
    const [allPower, setAllPower] = useState(0);
    const [allPowerCost, setAllPowerCost] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/powerCost', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',


            },
        })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data)
                    const newLabels = [];
                    const newDatasets = [];
                    let sum=0;
                    for (let i = 0; i < data.length; i++) {
                        newLabels.push(dateformat(new Date(data[i].date), 'dd.mm.yyyy'));
                        newDatasets.push(data[i].consumption);
                        sum+=data[i].consumption;
                    }
                    const newData = {
                        labels: newLabels,
                        datasets: [
                            {
                                data: newDatasets,
                            },
                        ],
                    };
                    setDataState(newData);
                    setAllPower(sum);
                    setAllPowerCost(sum*0.5);
                }
            ).catch(err => console.log(err));


    }, []);
    useEffect(() => {
        fetch("http://localhost:3001/top5PowerConsumers", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const newLabels = [];
                const newDatasets = [];
                let sum=0;
                for (let i = 0; i < data.length; i++) {
                    newLabels.push(data[i].name);
                    newDatasets.push(data[i].Powers);
                    sum+=parseFloat(data[i].Powers);
                    console.log(sum);
                }

                const newData = {
                    labels: newLabels,
                    datasets: [
                        {
                            data: newDatasets,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                            ],
                            borderWidth: 1
                        },
                    ],
                };
                console.log(sum);
                setDataState2(newData);
            }).catch(err => console.log(err));
    }, []);

    return (
        <Container style={{ width: "100%", height: "100%" }}>
            <Row style={{ height: "80%",width: "100%"}}>
                <Col style={{ height: "100%",width: "50%" }}>
                    <Line data={dataState} options={optionsState} />

                </Col>
                <Col style={{ height: "100%",width: "50%" }}>
                    <Bar data={dataState2} options={optionsState2} />

                </Col>
            </Row>
            <Row style={{ height: "20%", width: "100%" }}>
                <Col style={{ height: "100%", width: "50%" }}>
                    <Card variant={'bordered'} style={{width:'70%'}} className="mx-auto">
                        <Card.Body>
                            <Text size={'$4xl'}>Zużycie w ciągu ostatnich 30 dni</Text>
                            <Text size={'$xl'}>{allPower} kW/h</Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{ height: "100%", width: "50%",display:'flex', justifyContent:'right'} }>
                    <Card variant={'bordered'} style={{width:'70%',alignItems:'self-end'}} className="mx-auto float-end">
                        <Card.Body>
                            <Text size={'$4xl'}>Koszt prądu w ciągu ostatnich 30 dni</Text>
                            <Text size={'$xl'}>{allPowerCost} zł</Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Container>
    );
}

export default MyCharts;