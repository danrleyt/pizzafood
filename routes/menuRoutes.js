const menuController = require('../controllers').menu;

module.exports = app => {
  app.get('/api/menus', async (req, res) => {
    try {
      const menus = await menuController.list(100);
      res.send(menus);
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
