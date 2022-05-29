const express = require('express');
const { getBillbyGroupId, addBill } = require('../controller/billController');
const { validateToken } = require('../middleware');
// -------------------------------------

const billRoutes = express.Router();

// -------------------------------------
billRoutes.get('/bills/:group_id', validateToken, getBillbyGroupId);

billRoutes.post('/bills', validateToken, addBill);
// -------------------------------------
module.exports = billRoutes;
