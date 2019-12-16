const OrdersItem = require('../models').OrdersItem;
const InvalidInputError = require('../util/errorHandler').InvalidInputError;
const DatabaseOperationError = require('../util/errorHandler')
  .DatabaseOperationError;

module.exports = {
  add(orderId, menuId, size, number) {
    if (!orderId) {
      throw new InvalidInputError('Invalid or null order ID');
    }
    if (!menuId) {
      throw new InvalidInputError('Invalid or null menu ID');
    }
    if (!size) {
      throw new InvalidInputError('Invalid or null size');
    }
    if (!number) {
      throw new InvalidInputError('Invalid or null number');
    }

    try {
      return OrdersItem.create({
        size,
        number,
        menuId,
        orderId
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  async alter(status, orderItemId, menuId, size, number) {
    if (!orderItemId) {
      throw new InvalidInputError('Invalid or null order item ID');
    }
    if (!menuId) {
      throw new InvalidInputError('Invalid or null menu ID');
    }
    if (!size) {
      throw new InvalidInputError('Invalid or null size');
    }
    if (!number) {
      throw new InvalidInputError('Invalid or null number');
    }
    if (status === 'DELIVERED') {
      throw new DatabaseOperationError(
        'Not allowed to change order after delivered '
      );
    }
    try {
      const [rowsUpdate, [updatedOrder]] = await OrdersItem.update(
        {
          menuId,
          size,
          number
        },
        {
          returning: true,
          where: { id: orderItemId }
        }
      );
      return updatedOrder;
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  async remove(orderItemId) {
    try {
      const orderItem = await OrdersItem.findOne({
        where: { id: orderItemId }
      });
      orderItem.destroy();
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  }
};
