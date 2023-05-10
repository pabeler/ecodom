import React, { useEffect, useState } from 'react';
import {Button, List, ListItem} from "@mui/material";
import { Card, Text, Spacer } from "@nextui-org/react";
import { Room } from './RoomList';

export default function roomEntry({room, updateState}) {
    const handleDelete = () => {
        fetch("http://localhost:3001/rooms/" + room.id, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(updateState(room.id));
    }

    const [devices, setDevices] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/rooms/devices/" + room.id, {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(data => setDevices(data))
    }, [])

    return (
        <Card css={{ h: "$84", width: "1000px"}}>
        <Card.Body shadow>
            <Text h3>{room.name}</Text>
            <Text h5>Urządzenia w pokoju: {room.devicesCount}</Text>
            <Spacer y={1} />
            <List dense={true}>
                {devices?.map((device) => (
                    <ListItem key={device.id} color='gray'>
                        <Text h6>{device.name}</Text>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={handleDelete}>Usuń</Button>
        </Card.Body>
        </Card>
    )
}
