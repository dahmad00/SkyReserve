
//const seat=require('./models/Seat')


exports.flight=function(req,res)
{
   
const {Sequelize, DataTypes, TIME} = require("sequelize");
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


const flight = sequelize.define("flight", {
    FlightID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
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
 sequelize.sync({force: true}).then(() => {
    console.log(' Flight table created successfully!');
 }).catch((error) => {
    console.error('Unable to flight create table : ', error);
 });

 return flight;
};