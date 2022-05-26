const express = require('express');
const { getBillbyGroupId } = require('../controller/billController');
const { validateToken } = require('../middleware');
// -------------------------------------

const billRoutes = express.Router();

// -------------------------------------
billRoutes.get('/bills/:group_id', validateToken, getBillbyGroupId);
// -------------------------------------
module.exports = billRoutes;
