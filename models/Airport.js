
const {sequelize,DataTypes}=require('../connection')

const Airport = sequelize.define("Airport", {
    AirportID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
      
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    Location: {
      type: DataTypes.STRING,
      notNull: true
    }
 });
 sequelize.sync().then(() => {
    console.log('airport table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports=Airport;