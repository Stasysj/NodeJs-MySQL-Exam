const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// -----------------------------------------------

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}
// ---------------------------------------------
function getAllUsersDB() {
  const sql = 'SELECT * FROM users';
  return executeDb(sql, []);
}

function registerUserDB(full_name, email, password) {
  const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  return executeDb(sql, [full_name, email, password]);
}

function findUserByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return executeDb(sql, [email]);
}
// ------------------

module.exports = {
  executeDb,
  getAllUsersDB,
  registerUserDB,
  findUserByEmail,
};
