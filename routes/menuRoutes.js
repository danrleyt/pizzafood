const { getMenu } = require('../controllers/menuController');

module.exports = app => {
  app.get('/api/menus', getMenu);
};
