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

        res.json(result);
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

        res.json(result);
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

        res.json(result);
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

        res.json(result);
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

        res.json(result);
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

        res.json({
            licence_plate: req.params.id,
            time_entered: dateEntered.toString(),
            fee: fee,
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

module.exports = router;
