
const {sequelize,DataTypes}=require('../connection')

const Flight=require('./Flight')
const Seat=require('./Seat')


Flight.hasMany(Seat);

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured  for flight and seat");
});

module.exports={Flight,Seat};