const models = require('./models');
const Menu = models.Menu;

async function seed() {
  try {
    await Menu.findOrCreate({
      where: { name: 'MARGARITA' },
      defaults: {
        name: 'MARGARITA',
        type: 'pizza'
      }
    });

    await Menu.findOrCreate({
      where: { name: 'MARINARA' },
      defaults: {
        name: 'MARINARA',
        type: 'pizza'
      }
    });

    await Menu.findOrCreate({
      where: { name: 'SALAMI' },
      defaults: {
        name: 'SALAMI',
        type: 'pizza'
      }
    });

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();
