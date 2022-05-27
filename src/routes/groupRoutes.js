const express = require('express');
const { getGroups } = require('../controller/groupControler');

// -------------------------------

const groupRoutes = express.Router();

// ----------------------------
groupRoutes.get('/groups', getGroups);
// -----------------------------
module.exports = groupRoutes;
