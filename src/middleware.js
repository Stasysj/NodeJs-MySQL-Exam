const Joi = require('joi');

async function validateUser(req, res, next) {
  // validuoti gauta email ir password
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    full_name: Joi.string().trim().min(2).required(),
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    // abortEarly default true - rodyti tik pirma rasta klaida
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

module.exports = {
  validateUser,
};
