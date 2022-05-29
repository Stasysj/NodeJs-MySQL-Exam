const { getGroupsdDB, postGroupsDB } = require('../model/groupModules');

// ---------------------------------------
async function getGroups(req, res) {
  try {
    const getGroupsSelect = await getGroupsdDB(req.userId);
    res.json(getGroupsSelect);
  } catch (error) {
    console.log('Get getGroups error ===', error);
    res.sendStatus(500);
  }
}
// ----------------------------------------
async function postGroups(req, res) {
  const { name } = req.body;
  try {
    const saveResult = await postGroupsDB(name);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Group add');
      return;
    }
    res.status(400).json('Grupe neprideta');
  } catch (error) {
    console.log('POST /groups ===', error);
    res.sendStatus(500);
  }
}
// --------------------
module.exports = {
  getGroups,
  postGroups,
};
