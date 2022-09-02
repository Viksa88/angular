const express = require('express');
const { customerController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const customerValidation = require("../../validations/customer.validation")
const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(customerValidation.createCustomer), customerController.createCustomer)
  .get(auth('manageUsers'),customerController.getCustomers);

router
  .route('/:userId')
  // .get(auth('getUsers'), validate(customerValidation.getCustomer), customerController.)
  .patch(auth('manageUsers'), validate(customerValidation.updateCustomer), customerController.updateCustomer)
  .delete(auth('manageUsers'), validate(customerValidation.getCustomer), customerController.deleteCustomer);


// router
//   .route('/')
//   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//   .get(validate(userValidation.getUsers), userController.getUsers);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
