import { useEffect, useState } from "react";
import DeviceEntry from "./DeviceEntry";
import { Grid, Spacer } from "@nextui-org/react";
import { Dropdown, Row } from "@nextui-org/react";
import React from "react";
export interface Device {
    id: number;
    name: string;
    category: string;
    roomName: string;
    maxPower: number;
    avgUsageHours: number;
    avgUsageMinutes: number;
    dailyPowerCost: number;
}


export default function deviceList() {
    const [devices, setDevices] = useState([]);
    const [allRooms, setRooms] = useState(["Wszystkie"]); // ["Pokój 1", "Pokój 2", "Pokój 3"
    
    const [selected, setSelected] = React.useState(new Set(["Wszystkie"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const [devicesCopy, setDevicesCopy] = useState([]);
    

    const updateState = (deleted:number) => {
        setDevices(devices.filter((device:Device) => device.id != deleted));
    }
    
    useEffect(() => {
        console.log("Fetching devices")
        fetch("http://localhost:3001/devices", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(
            (result) => {
                result.dailyPowerCost = Math.round(result.dailyPowerCost, 2);
                setDevices(result);
                let rooms:any = ["Wszystkie"];
                for (let i = 0; i < result.length; i++) {
                    if (!rooms.includes(result[i].roomName) && result[i].roomName != null) {
                        rooms.push(result[i].roomName);
                    }
                }
                setRooms(rooms);
                setDevicesCopy(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }, []);


    useEffect(() => {
        selectedValue === "Wszystkie" ? setDevices(devicesCopy) : setDevices(devicesCopy.filter((device:Device) => device.roomName === selectedValue));
    }, [selectedValue]);



    return (
        <div>
            <Row align="center" justify={"space-between"}>
                <h1>Lista urządzeń</h1>
                <Spacer x={1} />
                <Dropdown>
                    <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}>
                        {allRooms.map((room:string) => (
                            <Dropdown.Item key={room}>{room}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Grid.Container gap={4} justify="center">
                {devices.map((device:Device) => (
                    // device.dailyPowerCost = Math.round(device.dailyPowerCost * 100) / 100;
                    <Grid xs={4}>
                        <DeviceEntry device={device} updateState={updateState} />
                    </Grid>
                ))} 
            </Grid.Container>
        </div>
    )
}