const express = require('express');
const { getUsers, regUser } = require('../controller/userController');
const { validateUser } = require('../middleware');
const { executeDb, getAllUsersDB, registerUserDB } = require('../model/userModel');
const { hashPassword } = require('../utils/helpers');

// ---------------------------------

const userRoutes = express.Router();

// --------------------------------
userRoutes.get('/users', getUsers);

// ---------------------------------
userRoutes.post('/register', validateUser, regUser);

// ----------------------
module.exports = userRoutes;
