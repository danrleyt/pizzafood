'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrdersItem = sequelize.define(
    'OrdersItem',
    {
      size: DataTypes.STRING,
      number: DataTypes.INTEGER
    },
    {}
  );
  OrdersItem.associate = function(models) {
    // associations can be defined here
    OrdersItem.belongsTo(models.Menu, { as: 'menu', onDelete: 'CASCADE' });
    OrdersItem.belongsTo(models.Order, { as: 'order', onDelete: 'CASCADE' });
  };
  return OrdersItem;
};
