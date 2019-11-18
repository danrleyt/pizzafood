'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    'Menu',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING
    },
    {}
  );
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.hasMany(models.OrdersItem, {
      foreignKey: 'menuId',
      as: 'menu'
    });
  };
  return Menu;
};
