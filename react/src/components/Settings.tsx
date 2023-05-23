import { use, useEffect, useState } from "react"
import {Grid, Switch,Input,Text,Container,Button, Dropdown} from "@nextui-org/react";
import React from "react";



export default function settings() {

    const [powerCost, setPowerCost] = useState('');
    const [panelArea, setPanelArea] = useState('');
    const [panelCapacity, setPanelCapacity] = useState('');
    const [isOn, setIsOn] = useState('false');

    const [selected, setSelected] = React.useState(new Set(["Taryfa"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

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
        if (e === 'G11') {
            setPowerCost('0.77')
        } else if (e === 'G12') {
            setPowerCost('0.89')
        } else if (e === 'G12W') {
            setPowerCost('0.95')
        }
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
            <Grid.Container gap={2} justify="center">
                <Grid xs={6}>
                    <Text css={{textAlign:'center'}} h2>Fotowoltaika</Text>
                </Grid>
                <Grid xs={6}>
                    <Text css={{
                        marginLeft: 'auto',
                    }} h2>Wybór taryfy</Text>
                </Grid>
                <Grid xs={6}>
                    <Switch checked={isOn==='true'} onChange={setIsOnI}></Switch>
                </Grid>
                <Grid xs={6}>
                    <Dropdown>
                        <Dropdown.Button flat css={{
                            marginLeft: 'auto',
                        }}>{selectedValue}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selected}
                            onAction={setPowerCostI}
                            onSelectionChange={setSelected}>
                            <Dropdown.Item key="G11">Taryfa G11</Dropdown.Item>
                            <Dropdown.Item key="G12">Taryfa G12</Dropdown.Item>
                            <Dropdown.Item key="G12W">Taryfa G12W</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
                <Grid xs={6}>
                    <Input clearable label={'Moc paneli (W)'} initialValue={panelCapacity} onChange={setPanelCapacityI}></Input>
                </Grid>
                <Grid xs={6}>
                    {/*<Input css={{
                        marginLeft: 'auto',
                    }} clearable label={'Koszt prądu (kW/h)'} initialValue={powerCost} onChange={setPowerCostI}></Input>*/}
                    {/*<p>Wybrana taryfa: {powerCost}</p>*/}
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={4}>
                    <Button css={{
                        display: 'block',
                        margin: '0 auto',
                    }} onPressEnd={saveSettings}> Zapisz Zmiany</Button>
                </Grid>
                <Grid xs={4}></Grid>
            </Grid.Container>
        </Container>
    )
}