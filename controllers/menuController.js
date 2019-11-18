const Menu = require('../models').Menu;
const InvalidInputError = require('../util/errorHandler').InvalidInputError;
const DatabaseOperationError = require('../util/errorHandler')
  .DatabaseOperationError;

module.exports = {
  list(limit) {
    try {
      return Menu.findAll({ limit });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  add(menu) {
    if (!menu.name) {
      throw new InvalidInputError('Name of menu item not valid');
    }
    if (!menu.type) {
      throw new InvalidInputError('Type not valid');
    }

    try {
      return Menu.create({
        name: menu.name,
        type: menu.type
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  },
  getMenu(menu) {
    try {
      return Menu.findOrCreate({
        where: { name: menu.name },
        defaults: { name: menu.name, type: menu.type }
      });
    } catch (error) {
      throw new DatabaseOperationError(error.message);
    }
  }
};
