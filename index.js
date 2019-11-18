const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

menuRoutes(app);
orderRoutes(app);

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT);
}
