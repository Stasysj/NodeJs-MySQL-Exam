const express = require('express');
const { getUsers, regUser, loginUser } = require('../controller/userController');
const { validateUser, validateToken } = require('../middleware');
const { executeDb, getAllUsersDB, registerUserDB, findUserByEmail } = require('../model/userModel');
const { hashPassword, passWordsMatch, generateJwtToken } = require('../utils/helpers');

// ---------------------------------

const userRoutes = express.Router();

// --------------------------------
userRoutes.get('/users', validateToken, getUsers);

// ---------------------------------
userRoutes.post('/register', validateUser, regUser);
// -------------------------------------------

userRoutes.post('/login', loginUser);
// ----------------------
module.exports = userRoutes;
