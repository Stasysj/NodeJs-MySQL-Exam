const express = require('express');
const { getUsers, regUser, loginUser } = require('../controller/userController');
const { validateUser, validateToken } = require('../middleware');

// -------------------------------------------

const userRoutes = express.Router();

// ------------------------------------------
userRoutes.get('/users', validateToken, getUsers);

// ---------------------------------
userRoutes.post('/register', validateUser, regUser);
// -------------------------------------------

userRoutes.post('/login', loginUser);
// -------------------------------------------
module.exports = userRoutes;
