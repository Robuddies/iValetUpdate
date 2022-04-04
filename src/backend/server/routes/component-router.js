const express = require('express');
const { sql, poolPromise } = require('../db');
const router = express.Router();
const { DateTime } = require('luxon');
const calculateFee = require('../parkingfee');

const table_name = 'parking_info';

// get all parking info
router.get('/all', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(`select * from ${table_name}`);

        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// get nearest empty non-handicap lot
router.get('/nearest_empty', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `select top 1 * from ${table_name} where (empty = 1 and handicap = 0) order by distance desc`
            );

        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// get nearest empty handicap lot
router.get('/nearest_empty_handicap', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `select top 1 * from ${table_name} where (empty = 1 and handicap = 1) order by distance desc`
            );

        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// get info by lot id
router.get('/lot/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('input_id', sql.Int, req.params.id)
            .query(`select * from ${table_name} where lot_id = @input_id`);

        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// get info by licence plate
router.get('/licence_plate/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('input_licence_plate', sql.NVarChar, req.params.id)
            .query(
                `select * from ${table_name} where licence_plate = @input_licence_plate`
            );

        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// get fee by licence plate
router.get('/calculate_fee/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('input_licence_plate', sql.NVarChar, req.params.id)
            .query(
                `select * from ${table_name} where licence_plate = @input_licence_plate`
            );

        const dateEntered = DateTime.fromISO(
            await result.recordset[0]['time_parked'].toISOString()
        );

        const fee = calculateFee(dateEntered);

        res.status(200).json({
            licence_plate: req.params.id,
            time_entered: dateEntered.toString(),
            fee: fee,
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// exit parking lot by licence plate
router.post('/exit/:id', async (req, res) => {
    try {
        const pool = await poolPromise;

        // calculate fee and x, y coordinates
        const result = await pool
            .request()
            .input('input_licence_plate', sql.NVarChar, req.params.id)
            .query(
                `select * from ${table_name} where licence_plate = @input_licence_plate`
            );

        const dateEntered = DateTime.fromISO(
            await result.recordset[0]['time_parked'].toISOString()
        );

        const fee = calculateFee(dateEntered);

        const { x_coord, y_coord } = await result.recordset[0];

        // update table
        await pool
            .request()
            .input('input_licence_plate', sql.NVarChar, req.params.id)
            .query(
                `update ${table_name} set empty = 1, licence_plate = '' where licence_plate = @input_licence_plate`
            );

        res.status(200).json({
            licence_plate: req.params.id,
            time_entered: dateEntered.toString(),
            fee: fee,
            x_coord: x_coord,
            y_coord: y_coord,
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

// enter parking lot by licence plate
router.post('/park/:id/:lp', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('input_id', sql.Int, req.params.id)
            .input('input_licence_plate', sql.NVarChar, req.params.lp)
            .input('input_park_time', sql.DateTime, DateTime.now().toISO())
            .query(
                `update ${table_name} set empty = 0, licence_plate = @input_licence_plate, time_parked = @input_park_time where lot_id = @input_id`
            );
        res.status(200).json({
            message: 'Success!',
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

module.exports = router;
