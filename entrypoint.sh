# entrypoint.sh

npm install
npx sequelize db:migrate
node seedMenu
npx cross-env NODE_ENV=test npx sequelize db:create
npx cross-env NODE_ENV=test npx sequelize db:migrate
npm run test
npx cross-env NODE_ENV=test npx sequelize db:drop

npm start