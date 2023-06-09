import styles from "@/styles/Home.module.css";
import {Button} from "@mui/material";
import {Grid, Input, Text} from '@nextui-org/react';
import axios from "axios";

export default function addDevice() {
    let add = async () => {
        let name = document.getElementById('device_name') as HTMLInputElement;
        let power = document.getElementById('device_power') as HTMLInputElement;
        let avg_time_hour = document.getElementById('avg_time_hour') as HTMLInputElement;
        let avg_time_minute = document.getElementById('avg_time_minutes') as HTMLInputElement;
        let room_name = document.getElementById('room_name') as HTMLInputElement;
        if (avg_time_hour.value == "24" && avg_time_minute.value != "0") {
            alert("Niepoprawny czas użycia");
            return;
        }
        try {
            axios.get(`http://localhost:3001/rooms/${room_name.value}`)
            .then(async (response) => {
                console.log(response.data[0])
                if(response?.data[0]?.id){
                    // alert("Pokój " + room_name.value + " już istnieje")
                } else {
                    await axios.post('http://localhost:3001/rooms', {name: room_name.value}).then(() =>{
                        alert("Dodano pokój " + room_name.value)
                    })
                }
            }).then(async () =>{
                console.log(room_name.value)
                await axios.get(`http://localhost:3001/rooms/${room_name.value}`).then((response) => {
                    console.log(response)
                    let id = response.data[0].id;
                    axios.post('http://localhost:3001/devices', {name: name.value, category: "costam",
                    maxPower: power.value, room: id, avgUsageHours: avg_time_hour.value, avgUsageMinutes: avg_time_minute.value}).then(() => {
                    alert("Dodano urządzenie " + name.value)
                    }).catch((error)=>{
                        alert("Nie udało się dodać pokoju");
                    });
                })
            })
        } catch (e) {
            alert("Nie udało się dodać pokoju " + room_name.value)
        }
    };

    return (
        <div>
            <h1>Dodaj urządzenie</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <Grid.Container gap={1} style={{width: 300}}>
                        <Grid xs={12}>
                            <input className={styles.formField} type="text" id="device_name" name="device_name"
                                   placeholder={"Nazwa urządzenia"} required/>
                        </Grid>
                        <Grid xs={12}>
                            <input className={styles.formField} type="number" placeholder={"Moc urządzenia [W]"}
                                   min={"1"} id="device_power" name="device_power" required/><br/>
                        </Grid>
                        <Grid xs={12}>
                            <input className={styles.formField} type="text" placeholder={"Nazwa pokoju"}
                                   id="room_name" name="room_name" required/><br/>
                        </Grid>
                        <Grid xs={12}>
                            <Text>
                                Średni czas użycia na dzień
                            </Text>
                        </Grid>
                        <Grid xs={6}>
                            <input className={styles.formField} type="number" id="avg_time_hour" name="avg_time_hour"
                                   placeholder={"godz"} min={"0"} max={"24"} required/>
                        </Grid>
                        <Grid xs={6}>
                            <input className={styles.formField} type="number" id="avg_time_minutes" name="avg_time_minutes"
                                   placeholder={"min"} min={0} max={59} required/>
                        </Grid>
                        <Grid xs={12} justify={'center'}>
                            <Button variant="contained" onClick={add}>Dodaj urzadzenie</Button>
                        </Grid>
                    </Grid.Container>
                </div>
            </form>
        </div>
    )
}