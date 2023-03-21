//const booking=require('./models/Booking')
//const payment=require('./models/Payment')

exports.customer=function(req,res)
{
   
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
 'reservations',
 'root',
 '',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 }); 


const customer = sequelize.define("customer", {
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
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
 sequelize.sync({force: true}).then(() => {
    console.log(' Customer table created successfully!');
 }).catch((error) => {
    console.error('Unable to create customer table : ', error);
 });
/*
 customer.hasMany(booking,{foreignKey:'bookingID',as:'booking'});
booking.belongsTo(customer,{foreignKey:'bookingID',as:'booking'});



customer.hasMany(payment,{foreignKey:'paymentID',as:'payment'});
payment.belongsTo(customer,{foreignKey:'paymentID',as:'payment'});
*/
 return customer;
};