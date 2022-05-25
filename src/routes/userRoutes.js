const express = require('express');
const { getUsers, regUser } = require('../controller/userController');
const { validateUser, validateToken } = require('../middleware');
const { executeDb, getAllUsersDB, registerUserDB, findUserByEmail } = require('../model/userModel');
const { hashPassword, passWordsMatch, generateJwtToken } = require('../utils/helpers');

// ---------------------------------

const userRoutes = express.Router();

// --------------------------------
userRoutes.get('/users', validateToken, getUsers);

// ---------------------------------
userRoutes.post('/register', validateUser, regUser);

userRoutes.post('/login', validateUser, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;

  // patikrinti ar yra toks email kaip gautas
  const foundUserArr = await findUserByEmail(gautasEmail);
  // nes findUserByEmail grazina visada masyva
  const foundUser = foundUserArr[0];
  console.log('foundUser ===', foundUser);
  // jei nera 400 email or password not found
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  // jei yra tikrinam ar sutampa slaptazodis
  // bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)
  if (!passWordsMatch(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  // sugeneruoti jwt token
  const payload = { userId: foundUser.id };
  const token = generateJwtToken(payload);
  // console.log('token ===', token);
  res.json({ success: true, token });
});
// ----------------------
module.exports = userRoutes;
