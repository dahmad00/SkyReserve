
const {sequelize,DataTypes}=require('../connection')

const Booking=require('./Book')
const Seat=require('./Seat')


Booking.belongsTo(Seat);


sequelize.sync({force: false}).then(function () {
    console.log("Database Configured  for booking and Seat");
});

module.exports={Booking,Seat};