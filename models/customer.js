const {sequelize,DataTypes}=require('../connection')
const validator = require("validator");
const customer = sequelize.define("customer", {
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    DOB: {
      type: DataTypes.DATEONLY,
      isDate: true,
      isAfter: "2023-03-01",
      isBefore: "2023-12-01",
      notNull: true
    },
    Gender: {
      type: DataTypes.STRING,
      
    }
 });

 sequelize.sync().then(() => {
  console.log('Customer table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


 module.exports=customer;