
const conn=require('./models/connection')
exports.seat=function(req,res)
{
conn.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 }); 


const Seat = sequelize.define("Seat", {
    SeatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
    },
    Type: {
      type: DataTypes.STRING(64),
      allowNull: false,
      isLowercase: true,
      isUppercase: true
    },
    Position: {
      type: DataTypes.STRING,
      notNull: true
    }
 });
 sequelize.sync({force: true}).then(() => {
    console.log(' Seat table created successfully!');
 }).catch((error) => {
    console.error('Unable to create seat table : ', error);
 });
 return Seat;
};