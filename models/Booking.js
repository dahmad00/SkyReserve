
//const seat=require('./models/Seat')
const conn=require('./models/connection')
exports.booking=function(req,res)
{
conn.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 }); 


const booking = sequelize.define("booking", {
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
    },
    ExpiryTime: {
      type: DataTypes.TIME,
      notNull: true
    }
    
 });
 sequelize.sync({force: true}).then(() => {
    console.log(' Booking table created successfully!');
 }).catch((error) => {
    console.error('Unable to create booking table : ', error);
 });

 return booking;

};