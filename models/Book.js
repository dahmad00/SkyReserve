
const {DataTypes} = require('sequelize')
const sequelize  = require('../connection')


const booking = sequelize.define("booking", {
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
      
    },
    ExpiryTime: {
      type: DataTypes.TIME,
      notNull: true
    }
    
 });
 sequelize.sync().then(() => {
    console.log('booking table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports=booking;