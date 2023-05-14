
const {DataTypes} = require('sequelize')
const { createPool } = require('mysql2');
const sequelize  =require('../connection')
const validator = require("validator");
const connection = require('../connection')

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

 connection.sync().then(() => {
  console.log('Customer table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


 module.exports=customer;