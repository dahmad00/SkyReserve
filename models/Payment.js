
const conn=require('./models/connection')
exports.payment=function(req,res)
{
conn.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 }); 


const Payment = sequelize.define("Payment", {
    PaymentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
    },
    Method: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    Amount: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    
 });
 sequelize.sync({force: true}).then(() => {
    console.log(' Payment table created successfully!');
 }).catch((error) => {
    console.error('Unable payment to create table : ', error);
 });

 return Payment;
};