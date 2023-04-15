
const {sequelize,DataTypes}=require('../connection')

const Customer=require('./customer')
const Booking=require('./Book')
Customer.hasMany(Booking);

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured  for Customer and booking");
});

module.exports={Customer,Booking};