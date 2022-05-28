const { getGroupsdDB, postGroupsDB } = require('../model/groupModules');

// ---------------------------------------
async function getGroups(req, res) {
  try {
    // console.log('vadega', req.userId);
    const getGroupsSelect = await getGroupsdDB(req.userId);
    // console.log('antras masyvas', getGroupsSelect);
    res.json(getGroupsSelect);
  } catch (error) {
    console.log('Get getGroups error ===', error);
    res.sendStatus(500);
  }
}
// ----------------------------------------
async function postGroups(req, res) {
  const { name } = req.body;
  
  //   const tokenFromHeaders = req.headers.authorization.split(' ')[1];
  //   const idfromToken = req.userId;
  //   console.log(group_id, user_id, tokenFromHeaders);
  //   console.log('idfromtoken', idfromToken);

  try {
    const saveResult = await postGroupsDB(name);
    if (saveResult.affectedRows === 1) {
        // -----------------------------------------------gali but bedu
      res.status(201).json('Group add');
      return;
    }
    res.status(400).json('Grupe neprideta');
  } catch (error) {
    console.log('POST /groups ===', error);
    // if (error.code === 'ER_DUP_ENTRY') {
    //   res.status(400).json('user alredy exists');
    //   return;
    // }

    res.sendStatus(500);
  }
}
// --------------------
module.exports = {
  getGroups,
  postGroups,
};
