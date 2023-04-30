import React from 'react';
import {Button} from "@mui/material";
import { Card, Text, Spacer } from "@nextui-org/react";
import { Device } from './DeviceList';
export default function deviceEntry({device}) {
    const handleDelete = () => {
        fetch("http://localhost:3001/devices/" + device.id, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
    }
    return (
        <Card css={{ h: "$84", width: "500px"}}>
        <Card.Body shadow>
            <Text h3>{device.name}</Text>
            <Text h5>{device.category}</Text>
            <Text h5>Pokój: {device.roomName}</Text>
            <Text h5>Maksymalna moc: {device.maxPower}W</Text>
            <Text h5>Średni czas użycia: {device.avgUsageHours}h {device.avgUsageMinutes}m</Text>
            <Text h5>Dzienny koszt: {device.dailyPowerCost}zł</Text>
            <Button variant="contained" onClick={handleDelete}>Usuń</Button>
        </Card.Body>
        </Card>
    )
}
