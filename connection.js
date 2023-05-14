
const {Sequelize,DataTypes} = require("sequelize");
  
    

function connection() {

  var sequelize;

  if (typeof connection.declared == 'undefined') {

    connection.declared = true;

    sequelize = new Sequelize(
      'airlinesystem',
      'root',
      '',
       {
         host: '127.0.0.1',
         dialect: 'mysql'
       }
    );

  }  

  return sequelize;
}     
 


module.exports = connection()