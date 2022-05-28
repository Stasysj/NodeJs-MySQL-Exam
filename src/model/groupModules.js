const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// ----------------------------
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
// ----------------------------------selecto padarymas uzpildymas
function getGroupsdDB(user_id) {
  const sql = 'SELECT * from groups ';
  return executeDb(sql, [user_id]);
}

function postGroupsDB(name) {
  const sql = 'INSERT INTO groups (name) VALUES (?)';
  return executeDb(sql, [name]);
}
// ---------------------------
module.exports = {
  getGroupsdDB,
  postGroupsDB,
};
