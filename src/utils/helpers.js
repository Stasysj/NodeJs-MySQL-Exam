require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------------------------
function hashPassword(plainTextString) {
  return bcrypt.hashSync(plainTextString, 10);
}

function passWordsMatch(enteredPass, storedHash) {
  return bcrypt.compareSync(enteredPass, storedHash);
}
function generateJwtToken(payload) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('generateJwtToken no secret');
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}
// ------------------------------
module.exports = {
  hashPassword,
  passWordsMatch,
  generateJwtToken,
};
