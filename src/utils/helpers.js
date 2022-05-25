require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------------------------
function hashPassword(plainTextString) {
  return bcrypt.hashSync(plainTextString, 10);
}

// ------------------------------
module.exports = {
  hashPassword,
};
