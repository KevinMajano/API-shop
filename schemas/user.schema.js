const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const alias = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(6).max(20);

const createUserSchema = Joi.object({
  name: name.required(),
  alias: alias.required(),
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  name: name,
  alias: alias,
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required()
});

const deleteUserSchema = Joi.object({
  id: id.required()
});

module.exports = {createUserSchema,updateUserSchema,getUserSchema,deleteUserSchema};
