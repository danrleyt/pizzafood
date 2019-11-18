const orderController = require('../controllers').order;
const customerController = require('../controllers').customer;
const ordersItemController = require('../controllers').ordersItem;

module.exports = app => {
  app.get('/api/orders', async (req, res) => {
    try {
      const orders = await orderController.list();
      res.send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/orders', async (req, res) => {
    const data = req.body;
    try {
      const [customer, created] = await customerController.get(data.customer);

      const code = customer.phone + Date.now();
      let order = await orderController.add(code, customer.id);

      const items = data.items.map(async item => {
        return await ordersItemController.add(
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
  });

  app.get('/api/orders/:code', async (req, res) => {
    const code = req.params.code;
    try {
      const order = await orderController.listByCode(code);
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete('/api/orders/:code', async (req, res) => {
    const code = req.params.code;
    try {
      orderController.remove(code);
      res.send({ message: 'Order Removed' });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.put('/api/orders/items', async (req, res) => {
    const ordersItem = req.body;
    try {
      let order = await orderController.listByPk(ordersItem.orderId);

      const newOrder = await ordersItemController.alter(
        order.status,
        ordersItem.id,
        ordersItem.menuId,
        ordersItem.size,
        ordersItem.number
      );
      order = await orderController.listByPk(ordersItem.orderId);
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.put('/api/orders/status', async (req, res) => {
    const orderData = req.body;
    try {
      const order = await orderController.alterStatus(
        orderData.code,
        orderData.status
      );

      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete('/api/orders/items/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await ordersItemController.remove(id);
      res.send({ message: 'Item removed' });
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
