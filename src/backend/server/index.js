const express = require('express');
const bodyParser = require('body-parser');
// const sql = require('mssql');
const cors = require('cors');

const componentRouter = require('./routes/component-router');

const app = express();
const API_PORT = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', componentRouter);

const server = app.listen(process.env.PORT || API_PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});

/*
// database config
const host = '70.231.13.237';

const username = 'base';
const password = '123';
const database = 'PARK';
const db_port = 1433;

const config = {
    server: host,
    database: database,
    user: username,
    password: password,
    port: db_port,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        // encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

// Route to get all parking occupancy info
app.get('/api/parking_info', (req, res) => {
    const parkingQuery = `select * from parking_info`;
    const request = new sql.Request();
    request.query(parkingQuery, (err, result) => {
        if (err) res.status(500).send(err);
        res.send(result);
    });
});

// Route to get all parking occupancy info
app.get('/api/parking_info', (req, res) => {
    const parkingQuery = `select * from parking_info`;
    const request = new sql.Request();
    request.query(parkingQuery, (err, result) => {
        if (err) res.status(500).send(err);
        res.send(result);
    });
});

sql.connect(config, (err) => {
    if (err) {
        console.log('Failed to open a SQL Database connection.', err.stack);
        process.exit(1);
    }
    app.listen(API_PORT, () => {
        console.log(`Server is running on ${API_PORT}`);
    });
});
*/
