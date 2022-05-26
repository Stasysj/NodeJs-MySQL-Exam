const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// ------------------------------------
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

function getBillbyGroupIdDB(group_id) {
  const sql = 'SELECT * FROM bills WHERE group_id=?';
  return executeDb(sql, [group_id]);
}

function addBillDB(group_id, amount, description) {
  const sql = 'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
  return executeDb(sql, [group_id, amount, description]);
}

// -------------------------------------
module.exports = {
  getBillbyGroupIdDB,
  addBillDB,
};
