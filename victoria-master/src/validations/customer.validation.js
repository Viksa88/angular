const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const getCustomers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().required().email(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteUser,
};
