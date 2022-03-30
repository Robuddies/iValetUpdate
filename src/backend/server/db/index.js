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

/*
async function loadParkingInfo() {
    console.log('started');
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config);
        const result = await sql.query`select * from parking_info`;
        //console.dir(result);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

loadParkingInfo();
*/
/*
function loadParkingInfo() {
    var dbConn = sql.Connection(config);

    dbConn
        .connect()
        .then(function () {
            var request = new sql.Request(dbConn);

            request
                .query('select * from PARKING_INFO')
                .then(function (recordSet) {
                    console.log(recordSet);
                    dbConn.close();
                })
                .catch(function (err) {
                    //8.
                    console.log(err);
                    dbConn.close();
                });
        })
        .catch(function (err) {
            //9.
            console.log(err);
        });
}
//10.
loadParkingInfo();


const mysql = require('mysql');

const host = '70.231.13.237,1443';

const username = 'base';
const password = '123';
const database = 'PARK';

const db = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
});

module.exports = db;
*/
