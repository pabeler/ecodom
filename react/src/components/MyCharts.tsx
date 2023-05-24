import {useEffect, useRef, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Col, Container, Grid, Row, Card, Text, Spacer} from "@nextui-org/react";
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
            text: 'Wykres zużytej energii przez ostatnie 30 dni (kW/h)',
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
            text: 'Wykres 5 największych konsumentów energii (kW/h)',
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

    const [panelSurface, setPanelSurface] = useState(0);
    const [panelPower, setPanelPower] = useState(0);
    const [powerCostS, setPowerCostS] = useState(0.5);
    const [isOn, setIsOn] = useState('false');
    const [settings, setSettings] = useState({powerCost: 0.5, panelSurface: 0, panelPower: 0, isOn: 'false'});



    useEffect(() => {
        fetch("http://localhost:3001/settings", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                setPowerCostS(data[0].settingValue);
                setPanelSurface(data[0].panel_surface);
                setPanelPower(data[0].battery_capacity);
                setIsOn(data[0].panelOn);
                setSettings({powerCost: data[0].settingValue, panelSurface: data[0].panel_surface, panelPower: data[0].battery_capacity, isOn: data[0].panelOn});


    })}, []);

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
                    if(isOn==='true')
                        sum=sum - settings.panelPower/1000* 0.83*6*newLabels.length;


                    sum=sum*-1;
                    setAllPower(sum);

                    setAllPowerCost(sum*settings.powerCost);
                    console.log(sum);
                    console.log(powerCostS);
                }
            ).catch(err => console.log(err));


    }, [settings]);



    // useEffect(() => {
    //     if(isOn==='true')
    //     {
    //         console.log("datasets "+ dataState.datasets[0].data.length);
    //         setAllPower(allPower - panelPower/1000* 0.83*6*dataState.datasets[0].data.length);
    //         setAllPowerCost((allPower - panelPower/1000* 0.83*6*dataState.datasets[0].data.length)*powerCostS);
    //     }
    //
    // },[powerCostS,isOn,panelPower,panelSurface]);


    useEffect(() => {
        fetch("http://localhost:3001/top5PowerConsumers", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        }).then(response => response.json())
            .then(data => {
                const newLabels = [];
                const newDatasets = [];
                let sum=0;
                for (let i = 0; i < data.length; i++) {
                    newLabels.push(data[i].name);
                    newDatasets.push(data[i].Powers);
                    sum+=parseFloat(data[i].Powers);
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
            <Row style={{ height: "10%", width: "100%" }}>
                <Col style={{ height: "100%", width: "50%", display:'flex'}}>
                    <Text size={'$4xl'}>Zużycie w ciągu ostatnich 30 dni</Text>
                </Col>
                <Col style={{ height: "100%", width: "50%",display:'flex', justifyContent:'right'} }>

                    <Text size={'$4xl'}>Koszt prądu w ciągu ostatnich 30 dni</Text>

                </Col>
            </Row>
            <Row style={{ height: "10%", width: "100%" }}>
                <Col style={{ height: "100%", width: "50%", display:'flex'}}>
                    <Text size={'$xl'}>{allPower.toFixed(0)} kW/h</Text>
                </Col>
                <Col style={{ height: "100%", width: "50%",display:'flex', justifyContent:'right'} }>
                    <Text size={'$xl'}>{allPowerCost.toFixed(2)} zł</Text>

                </Col>

            </Row>


        </Container>
    );
}

export default MyCharts;