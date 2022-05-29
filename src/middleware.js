const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

// --------------------------------------------------------------
async function validateUser(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().trim().min(2).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}
// --------------------------------------------------------------
async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'no token',
    });
    return;
  }
  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayload;
    req.userId = userId;
    next();
  } catch (error) {
    console.log('error verifyRezult ===', error);
    res.status(403).json({
      success: false,
      error: 'invalid token',
    });
  }
}
// ------------------------------------------
module.exports = {
  validateUser,
  validateToken,
};
