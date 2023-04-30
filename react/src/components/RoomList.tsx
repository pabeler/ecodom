import { useEffect, useState } from "react";
import RoomEntry from "./RoomEntry";
import { Grid } from "@nextui-org/react";
export interface Room {
    id: number;
    name: string;
}


export default function deviceList() {
    const [rooms, setRooms] = useState([]);   

    const updateState = (deleted:number) => {
        setRooms(rooms.filter((room:Room) => room.id != deleted));
    }

    useEffect(() => {
        console.log("Fetching rooms")
        fetch("http://192.168.1.1:3001/rooms", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(
            (result) => {
                setRooms(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }, []);

    return (
        <div>
            <h1>Lista pokoi</h1>
            <Grid.Container gap={1} justify="center" style={{width:500}}>
                {rooms.map((room:Room) => (
                    <Grid>
                        <RoomEntry room={room} updateState={updateState}/>
                    </Grid>
                ))} 
            </Grid.Container>
        </div>
    )
}