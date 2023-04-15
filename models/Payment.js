
const {sequelize,DataTypes}=require('../connection')

const Payment = sequelize.define("Payment", {
    PaymentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
      
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
 sequelize.sync().then(() => {
    console.log('payment table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports=Payment;