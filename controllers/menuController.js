const menuService = require('../services/').menu;

const getMenu = async (req, res) => {
  try {
    const menus = await menuController.list(100);
    res.send(menus);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getMenu
};
