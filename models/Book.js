
const {DataTypes} = require('sequelize')
const sequelize  = require('../connection')


const booking = sequelize.define("booking", {
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CNIC: {
      type: DataTypes.STRING,
      allowNull: false,
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