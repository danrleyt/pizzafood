const Order = require('../models').Order;
const Op = require('../models').Sequelize.Op;
const InvalidInputError = require('../util/errorHandler').InvalidInputError;
const DatabaseOperationError = require('../util/errorHandler')
  .DatabaseOperationError;

module.exports = {
  list() {
    try {
      return Order.findAll({});
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  listByCustomer(customerId) {
    try {
      return Order.findAll({
        where: { customerId },
        include: [{ all: true }]
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  async listByCode(code) {
    try {
      const order = await Order.findOne({
        where: { code },
        include: [{ all: true }]
      });
      if (order) {
        return order;
      } else {
        throw new DatabaseOperationError('Order Not Found');
      }
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  listByPk(id) {
    try {
      return Order.findByPk(id, {
        include: [{ all: true }]
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  async alterStatus(code, status) {
    if (!code) {
      throw new InvalidInputError('Invalid or null code');
    }
    const StatusType = ['PREPARING', 'DELIVERING', 'DELIVERED'];
    if (!StatusType.includes(status.toUpperCase())) {
      throw new InvalidInputError(
        'Status not valid, the status should be PREPARING, DELIVERING or DELIVERED'
      );
    }

    try {
      const [rowsUpdate, [updatedOrder]] = await Order.update(
        {
          status: status.toUpperCase()
        },
        {
          returning: true,
          where: {
            code,
            status: {
              [Op.notLike]: 'DELIVERED'
            }
          }
        }
      );
      if (updatedOrder) return updatedOrder;
      else {
        throw new DatabaseOperationError(
          'Not allowed to change status after delivered'
        );
      }
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },

  add(code, customerId) {
    if (!code) {
      throw new InvalidInputError('Invalid or null code');
    }
    if (!customerId) {
      throw new InvalidInputError('Invalid or null customer id');
    }
    try {
      return Order.create({
        status: 'PREPARING',
        code,
        customerId
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },

  async remove(code) {
    if (!code) {
      throw new InvalidInputError('Invalid or null code');
    }

    try {
      const order = await Order.findOne({
        where: { code }
      });
      order.destroy();
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  }
};
