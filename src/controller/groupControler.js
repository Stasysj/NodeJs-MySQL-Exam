const { getGroupsdDB } = require('../model/groupModules');

// ---------------------------------------
async function getGroups(req, res) {
  try {
    const getGroupsSelect = await getGroupsdDB();
    res.json(getGroupsSelect);
  } catch (error) {
    console.log('Get getGroups error ===', error);
    res.sendStatus(500);
  }
}
// --------------------
module.exports = {
  getGroups,
};
