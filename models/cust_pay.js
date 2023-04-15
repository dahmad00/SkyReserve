
const {sequelize,DataTypes}=require('../connection')

const Customer=require('./customer')
const Payment=require('./Payment')

Customer.hasMany(Payment);


sequelize.sync({force: false}).then(function () {
    console.log("Database Configured for customer and payment");
});

module.exports={Customer,Payment};