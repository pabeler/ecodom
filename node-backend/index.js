const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user:'root',
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

// async function asyncFunction() {
//     let conn;
//     try {
  
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       // rows: [ {val: 1}, meta: ... ]
  
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
//   }

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/devices', async (req, res) => {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("SELECT d.id, d.name, d.category, d.maxPower, d.avgUsageHours, d.avgUsageMinutes, r.name as roomName, r.id as rId FROM devices AS d LEFT JOIN rooms AS r ON d.roomId = r.id");
        powerCost = await conn.query("SELECT settingValue FROM settings WHERE settingName = 'powerCost'");
        powerCost = powerCost.length > 0 ? powerCost[0].settingValue : 1;
        result.forEach(element => {
            element.dailyPowerCost = (element.maxPower / 1000 * (element.avgUsageHours + element.avgUsageMinutes / 60) * powerCost)
        });
        console.log(result);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(200).json(result);
})

app.post('/devices', async (req, res) => {
    let deviceName = req.body.name;
    let deviceCategory = req.body.category;
    let deviceMaxPower = req.body.maxPower;
    let deviceRoom = req.body.room;
    let deviceAvgUsageHours= req.body.avgUsageHours;
    let deviceAvgUsageMinutes = req.body.avgUsageMinutes;
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("INSERT INTO devices (name, category, roomId, maxPower, avgUsageHours, avgUsageMinutes) VALUES (?, ?, ?, ?, ?, ?)",
        [deviceName, deviceCategory, deviceRoom, deviceMaxPower, deviceAvgUsageHours, deviceAvgUsageMinutes]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(201).redirect('/devices');
})

app.post('/devices/:id', async (req, res) => {
    let deviceName = req.body.name;
    let deviceCategory = req.body.category;
    let deviceMaxPower = req.body.maxPower;
    let deviceRoom = req.body.room;
    let deviceAvgUsageHours= req.body.avgUsageHours;
    let deviceAvgUsageMinutes = req.body.avgUsageMinutes;
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("UPDATE devices SET name = ?, category = ?, roomId = ?, maxPower = ?, avgUsageHours = ?, avgUsageMinutes = ? WHERE id = ?",
        [deviceName, deviceCategory, deviceRoom, deviceMaxPower, deviceAvgUsageHours, deviceAvgUsageMinutes, req.params.id]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(201).redirect('/devices');
})

app.delete('/devices/:id', async (req, res) => {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("DELETE FROM devices WHERE id = ?", [req.params.id]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(201).redirect('/devices');
})

app.get('/settings', async (req, res) => {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("SELECT * FROM settings");
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.send(JSON.stringify(result));
})

app.post('/settings', async (req, res) => {
    let settingName = req.body.name;
    let settingValue = req.body.value;
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("REPLACE INTO settings (name, value) VALUES (?, ?)", [settingName, settingValue]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(201).redirect('/settings');
    //res.send(JSON.stringify({settings: {maxPowerDraw: 1000}}));
})

app.get('/rooms', async (req, res) => {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("SELECT * FROM rooms");
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.json(result);
})

app.delete('/rooms/:id', async (req, res) => {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("DELETE FROM rooms WHERE id = ?", [req.params.id]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(201).redirect('/rooms');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
