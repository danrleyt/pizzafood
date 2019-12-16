const orderService = require('../services').order;
const customerService = require('../services').customer;
const ordersItemService = require('../services').ordersItem;

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.list();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createOrder = async (req, res) => {
  const data = req.body;
  try {
    const [customer, created] = await customerService.get(data.customer);

    const code = customer.phone + Date.now();
    let order = await orderService.add(code, customer.id);

    const items = data.items.map(async item => {
      return await ordersItemService.add(
        order.id,
        item.menuId,
        item.size,
        item.number
      );
    });

    Promise.all(items)
      .then(completed => res.status(201).send({ code }))
      .catch(error => {
        throw error;
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getOrderByCode = async (req, res) => {
  const code = req.params.code;
  try {
    const order = await orderService.listByCode(code);
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteOrderByCode = async (req, res) => {
  const code = req.params.code;
  try {
    orderService.remove(code);
    res.send({ message: 'Order Removed' });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateOrderItems = async (req, res) => {
  const ordersItem = req.body;
  try {
    let order = await orderService.listByPk(ordersItem.orderId);

    const newOrder = await ordersItemService.alter(
      order.status,
      ordersItem.id,
      ordersItem.menuId,
      ordersItem.size,
      ordersItem.number
    );
    order = await orderService.listByPk(ordersItem.orderId);
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateOrderStatus = async (req, res) => {
  const orderData = req.body;
  try {
    const order = await orderService.alterStatus(
      orderData.code,
      orderData.status
    );

    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItemId = async (req, res) => {
  const id = req.params.id;
  try {
    await ordersItemService.remove(id);
    res.send({ message: 'Item removed' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrderByCode,
  deleteOrderByCode,
  deleteItemId,
  updateOrderItems,
  updateOrderStatus
};
