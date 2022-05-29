const { getBillbyGroupIdDB, addBillDB } = require('../model/billModel');

// --------------------------------------

async function getBillbyGroupId(req, res) {
  const { group_id } = req.params;

  try {
    const billByGroupIdArr = await getBillbyGroupIdDB(group_id);
    res.json(billByGroupIdArr);
  } catch (error) {
    console.log('Get getBillbyGroupId error ===', error);
    res.sendStatus(500);
  }
}

async function addBill(req, res) {
  const { group_id } = req.query;
  const { amount, description } = req.body;
  try {
    const saveResult = await addBillDB(group_id, amount, description);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Bill add');
      return;
    }
    res.status(400).json('Bill nepridetas');
  } catch (error) {
    console.log('POST /bill ===', error);
    res.sendStatus(500);
  }
}

// -----------------------------
module.exports = {
  getBillbyGroupId,
  addBill,
};
