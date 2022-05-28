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

function getGroupsdDB(user_id) {
  const sql = 'SELECT DISTINCT groups.name FROM groups LEFT JOIN accounts ON groups.id=accounts.group_id WHERE  NOT(user_id = ? )';
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
