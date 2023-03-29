const Sequelize = require("sequelize");

const {sequelize, DataTypes} = new Sequelize(
    'reservations',
    'root',
    '',
     {
       host: '127.0.0.1',
       dialect: 'mysql'
     }
  );
  console.log(typeof(sequelize))

// sequelize.authenticate().then(() => {
//    console.log('Connection has been established successfully.');
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error);
// });