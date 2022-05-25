const { getAllUsersDB, registerUserDB } = require('../model/userModel');
const { hashPassword } = require('../utils/helpers');
// ------------------------------------------
async function getUsers(req, res) {
  try {
    const usersArr = await getAllUsersDB();
    res.json(usersArr);
  } catch (error) {
    console.log('userRoutes.get error ===', error);
    res.sendStatus(500);
  }
}
// ---------------------------------------
async function regUser(req, res) {
  const { full_name, email, password } = req.body;
  const newPassword = hashPassword(password);
  try {
    const saveResult = await registerUserDB(full_name, email, newPassword);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('POST /register ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('user alredy exists');
      return;
    }

    res.sendStatus(500);
  }
}
// ------------------------------
module.exports = {
  getUsers,
  regUser,
};
