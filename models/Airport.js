
//const flight=require('./models/Flight')


exports.airport=function(req,res)
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


const Airport = sequelize.define("Airport", {
    AirportID: {
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
    Locarion: {
      type: DataTypes.STRING,
      notNull: true
    }
 });
 sequelize.sync({force: true}).then(() => {
    console.log(' Airport table created successfully!');
 }).catch((error) => {
    console.error('Unable to create Airport table : ', error);
 });

 return Airport;
};