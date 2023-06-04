
const {DataTypes} = require('sequelize')

const sequelize  =require('../connection')


const Seat = sequelize.define("Seat", {
    SeatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
      
    },
    Type: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    Position: {
      type: DataTypes.STRING,
      notNull: true
    },
    Cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 });
 sequelize.sync().then(() => {
    console.log('seat table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports=Seat;