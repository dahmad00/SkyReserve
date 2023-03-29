
//const flight=require('./models/Flight')
const conn=require('./models/connection')

exports.airport=function(req,res)
{
  
conn.sequelize.authenticate().then(() => {
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