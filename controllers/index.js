const customer = require('./customersController');
const menu = require('./menuController');
const order = require('./orderController');
const ordersItem = require('./ordersItemController');

module.exports = {
  customer,
  menu,
  order,
  ordersItem
};
