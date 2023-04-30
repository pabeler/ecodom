import React from 'react';
import {Button} from "@mui/material";
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
    return (
        <Card css={{ h: "$84", width: "1000px"}}>
        <Card.Body shadow>
            <Text h3>{room.name}</Text>
            <Text h5>Urządzenia w pokoju: {room.devicesCount}</Text>
            <Button variant="contained" onClick={handleDelete}>Usuń</Button>
        </Card.Body>
        </Card>
    )
}
