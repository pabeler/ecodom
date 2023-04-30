import { useEffect, useState } from "react";
import DeviceEntry from "./DeviceEntry";
import { Grid } from "@nextui-org/react";
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
                setDevices(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }, []);


    return (
        <div>
            <h1>Lista urządzeń</h1>
            <Grid.Container gap={4} justify="center">
                {devices.map((device:Device) => (
                    <Grid xs={4}>
                        <DeviceEntry device={device} updateState={updateState} />
                    </Grid>
                ))} 
            </Grid.Container>
        </div>
    )
}