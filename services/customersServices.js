const Customer = require('../models').Customer;
const InvalidInputError = require('../util/errorHandler').InvalidInputError;
const DatabaseOperationError = require('../util/errorHandler')
  .DatabaseOperationError;

module.exports = {
  list(limit) {
    try {
      return Customer.findAll({ limit });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  add(customer) {
    try {
      return Customer.create({
        name: customer.name,
        phone: customer.phone,
        address: customer.address
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  get(customer) {
    if (!customer.phone) {
      throw new InvalidInputError('Invalid or null phone number');
    }
    try {
      return Customer.findOrCreate({
        where: { phone: customer.phone },
        defaults: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address
        }
      });
    } catch (error) {
      throw new DatabaseOperationError(error);
    }
  }
};
