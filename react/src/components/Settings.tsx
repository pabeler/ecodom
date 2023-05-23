import { use, useEffect, useState } from "react"
import {Grid, Switch,Input,Text,Container,Col,Row,Button} from "@nextui-org/react";




export default function settings() {

    const [powerCost, setPowerCost] = useState('');
    const [panelArea, setPanelArea] = useState('');
    const [panelCapacity, setPanelCapacity] = useState('');
    const [isOn, setIsOn] = useState('false');
    function saveSettings() {
        fetch("http://localhost:3001/settings", {
            method: "POST",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body: JSON.stringify({
                "settingName": 'powerCost',
                "settingValue": powerCost,
                "batteryCapacity": panelCapacity,
                "panelSurface": panelArea,
                "isOn": isOn

            })
        }).catch(err => console.log(err));
    }

    const setPowerCostI = (e:any) => {
        setPowerCost(e.target.value)
    }

    const setPanelCapacityI = (e:any) => {
        setPanelCapacity(e.target.value)
    }
    const setPanelAreaI = (e:any) => {
        setPanelArea(e.target.value)
    }

    const setIsOnI = (e:any) => {
        setIsOn(e.target.checked)
    }

    const [settings, setSettings] = useState([{settingName: 'powerCost', settingValue: 0.5, batteryCapacity: 0.5, panelSurface: 0.5, isOn: false}])
    useEffect(() => {
        fetch("http://localhost:3001/settings", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            setSettings(data);
            setPowerCost(data[0].settingValue);
            setPanelArea(data[0].panel_surface);
            setPanelCapacity(data[0].battery_capacity);
            setIsOn(data[0].panelOn);
            console.log("powerCost: " + data[0].settingValue)
            console.log("panelArea: " + data[0].panel_surface)
            console.log("panelCapacity: " + data[0].battery_capacity)
            console.log("isOn: " + data[0].panelOn)
            console.log(data);
        })
    }, [])

    return (
        <Container fluid justify={"center"} css={{justifyContent:'center',display:'flex'}} >
            <Text css={{textAlign:'center'}} h1>Ustawienia</Text>
            <Row>
                <Col>
                    <Switch checked={isOn==='true'} onChange={setIsOnI}></Switch>


                </Col>
                <Col>
                    <Input clearable label={'Koszt prądu'} initialValue={powerCost} onChange={setPowerCostI}></Input>

                </Col>


            </Row>
            <Row>
                <Col>
                    <Input clearable label={'Powierzchnia paneli'} initialValue={panelArea} onChange={setPanelAreaI}></Input>


                </Col>


            </Row>
            <Row>
                <Col>
                    <Input clearable label={'Pojemność paneli'} initialValue={panelCapacity} onChange={setPanelCapacityI}></Input>
                </Col>
            </Row>

            <Button css={{justifySelf:'center'}} onPressEnd={saveSettings}> Zapisz Zmiany</Button>



        </Container>
    )
}