const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, customerService, tokenService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;

  const data = {
    user: req.user._id,
    firstName,
    lastName,
    phone,
    email,
  };
  const customer = await customerService.createCustomer(data);
  res.status(httpStatus.CREATED).send(customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const result = await customerService.getAllCustomer(req.user._id);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getUserById(req.params.userId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  res.send(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.updateCustomerById(req.params.userId, req.body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
await customerService.deleteCustomerById(req.params.userId);
  res.status(200).json({success:true,message:"Customer is deleted"});
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
