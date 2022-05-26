const { getBillbyGroupIdDB } = require('../model/billModel');

// ------------------------------
async function getBillbyGroupId(req, res) {
  // const idfromToken = req.userId ;
  const {group_id} = req.params;
  console.log(group_id);
  try {
    const billByGroupIdArr = await getBillbyGroupIdDB(group_id);
    res.json(billByGroupIdArr);
  } catch (error) {
    console.log('Get getBillbyGroupId error ===', error);
    res.sendStatus(500);
  }
}

// -----------------------------
module.exports = {
  getBillbyGroupId,
};
