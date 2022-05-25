const express = require('express');
const { validateUser } = require('../middleware');
const { executeDb, getAllUsersDB } = require('../model/userModel');
const { hashPassword } = require('../utils/helpers');

// ---------------------------------

const userRoutes = express.Router();

// --------------------------------
userRoutes.get('/users', async (req, res) => {
  try {
    const usersArr = await getAllUsersDB();
    res.json(usersArr);
  } catch (error) {
    console.log('userRoutes.get error ===', error);
    res.sendStatus(500);
  }
});

// ---------------------------------
userRoutes.post('/register',validateUser, async (req, res) => {
  const newUser = req.body;
  newUser.password = hashPassword(newUser.password);
  try {
    const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    const saveResult = await executeDb(sql, [newUser.full_name, newUser.email, newUser.password]);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('POST /register ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('user alredy exists');
      return;
    }

    res.sendStatus(500);
  }
});

// ----------------------
module.exports = userRoutes;
