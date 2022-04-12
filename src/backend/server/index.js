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
