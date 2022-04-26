var pg = require('pg');

const host = '70.231.13.237';

const username = 'postgres';
const password = '123';
const database = 'PARKING';
const db_port = 5432;

const Pool = pg.Pool;

const config = {
    user: username,
    host: host,
    database: database,
    password: password,
    port: db_port,
};

const poolPromise = new Pool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to PostgreSQL');
        return pool;
    })
    .catch((err) =>
        console.log('Database Connection Failed! Bad Config: ', err)
    );

module.exports = {
    poolPromise,
};

/* MSSQL 
var sql = require('mssql');

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

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch((err) =>
        console.log('Database Connection Failed! Bad Config: ', err)
    );

module.exports = {
    sql,
    poolPromise,
};
*/
