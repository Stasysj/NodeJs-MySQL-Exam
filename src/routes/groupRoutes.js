const express = require('express');
const { getGroups, postGroups } = require('../controller/groupControler');
const { validateToken } = require('../middleware');

// -------------------------------

const groupRoutes = express.Router();

// ----------------------------
groupRoutes.get('/groups', validateToken, getGroups);
groupRoutes.post('/groups', postGroups);
// -----------------------------
module.exports = groupRoutes;
