
const {sequelize,DataTypes}=require('../connection')

const flight = sequelize.define("flight", {
    FlightID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      
      
    },
    Airplane: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    DepartureTime: {
      type: DataTypes.TIME,
      notNull: true
    },
    ArrivalTime: {
      type: DataTypes.TIME,
      notNull: true
    }
 });
 sequelize.sync().then(() => {
    console.log('flight table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports=flight;