import styles from "@/styles/Home.module.css";
import {Button} from "@mui/material";
import { Grid, Text } from '@nextui-org/react';

export default function addDevice() {
    let add = () => {
        let name = document.getElementById('device_name') as HTMLInputElement;
        let power = document.getElementById('device_power') as HTMLInputElement;
        let avg_time_hour = document.getElementById('avg_time_hour') as HTMLInputElement;
        let avg_time_minute = document.getElementById('avg_time_minute') as HTMLInputElement;
        if (avg_time_hour.value == "24" && avg_time_minute.value != "0") {
            alert("Niepoprawny czas użycia");
            return;
        }
        let avg_time = parseInt(avg_time_hour.value) * 60 + parseInt(avg_time_minute.value);
    };

    return (
        <div>
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
                            <Text>
                                Średni czas użycia na dzień
                            </Text>
                        </Grid>
                        <Grid xs={6}>
                            <input className={styles.formField} type="number" id="avg_time_hour" name="avg_time_hour"
                                   placeholder={"godz"} min={"0"} max={"24"} required/>
                        </Grid>
                        <Grid xs={6}>
                            <input className={styles.formField} type="number" id="avg_time_minutes" name="avg_time_hour"
                                   placeholder={"min"} min={0} max={59} required/>
                        </Grid>
                        <Grid xs={12}>
                            <Button variant="contained" onClick={add}>Dodaj urzadzenie</Button>
                        </Grid>
                    </Grid.Container>
                </div>
            </form>
        </div>
    )
}