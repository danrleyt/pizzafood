'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: DataTypes.STRING,
      code: DataTypes.STRING
    },
    {}
  );
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      as: 'customer'
    });
    Order.hasMany(models.OrdersItem, {
      foreignKey: 'orderId',
      as: 'ordersList'
    });
  };
  return Order;
};
