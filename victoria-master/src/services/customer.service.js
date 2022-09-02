const httpStatus = require('http-status');
const { User, Customer } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createCustomer = async (userBody) => {
  if ((await Customer.isEmailTaken(userBody.email)) || (await User.isEmailTaken(userBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return Customer.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCustomerById = async (userId, updateBody) => {
  const customer = await Customer.findById(userId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  if (
    (updateBody.email && (await Customer.isEmailTaken(updateBody.email, userId))) ||
    (await User.isEmailTaken(updateBody.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(customer, updateBody);
  await customer.save();
  return customer;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteCustomerById = async (userId) => {
  const customer = await Customer.findById(userId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  await customer.remove();
  return customer;
};

const getAllCustomer = async (id) => {
  const customers = await Customer.find({ user: id });
  return customers;
};

module.exports = {
  createCustomer,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateCustomerById,
  deleteCustomerById,
  getAllCustomer,
};
