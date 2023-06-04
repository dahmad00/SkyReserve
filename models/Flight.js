
const {DataTypes} = require('sequelize')
const sequelize =require('../connection')


const flight = sequelize.define("flight", {
    FlightID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
    },
    Airplane: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    Departure: {
      type: DataTypes.DATE,
      notNull: true
    },
    Arrival: {
      type: DataTypes.DATE,
      notNull: true
    },
    Economy_Total: {
      type:DataTypes.INTEGER,
      notNull: true
    },
    Economy_Avail: {
      type:DataTypes.INTEGER,
      notNull: true
    },
    Economy_Fare: {
      type:DataTypes.INTEGER,
      notNull: true
    },
    Business_Total: {
      type:DataTypes.INTEGER,
      notNull: true
    },
    Business_Avail: {
      type:DataTypes.INTEGER,
      notNull: true
    },
    Business_Fare: {
      type:DataTypes.INTEGER,
      notNull: true
    }
    
 });
 sequelize.sync().then(() => {
    console.log('flight table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports=flight;