const {
  getOrders,
  createOrder,
  getOrderByCode,
  deleteOrderByCode,
  updateOrderItems,
  updateOrderStatus,
  deleteItemId
} = require('../controllers/orderControllers');

module.exports = app => {
  app.get('/api/orders', getOrders);

  app.post('/api/orders', createOrder);

  app.get('/api/orders/:code', getOrderByCode);

  app.delete('/api/orders/:code', deleteOrderByCode);

  app.put('/api/orders/items', updateOrderItems);

  app.put('/api/orders/status', updateOrderStatus);

  app.delete('/api/orders/items/:id', deleteItemId);
};
