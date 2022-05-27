const { getBillbyGroupIdDB, addBillDB } = require('../model/billModel');

// ------------------------------
async function getBillbyGroupId(req, res) {
  // const idfromToken = req.userId ;
  const { group_id } = req.params;
  const id = req.userId;
  console.log('groupid', group_id);
  console.log('userid', id);
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

  console.log('idfromtoken', group_id, amount, description);

  try {
    const saveResult = await addBillDB(group_id, amount, description);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('Bill nepridetas');
  } catch (error) {
    console.log('POST /bill ===', error);
    // if (error.code === 'ER_DUP_ENTRY') {
    //   res.status(400).json('user alredy exists');
    //   return;
    // }

    res.sendStatus(500);
  }
}

// -----------------------------
module.exports = {
  getBillbyGroupId,
  addBill,
};
