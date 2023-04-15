
const {Sequelize,DataTypes} = require("sequelize");
  
    const sequelize = new Sequelize(
        'airline reservations',
        'root',
        '',
         {
           host: '127.0.0.1',
           dialect: 'mysql'
         }
      );
 
;
module.exports={sequelize,DataTypes};
 