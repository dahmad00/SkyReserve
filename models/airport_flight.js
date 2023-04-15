
const {sequelize,DataTypes}=require('../connection')

const Flight=require('./Flight')
const Airport=require('./Airport')


Flight.hasMany(Airport);

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured  for airport and flight ");
});

module.exports={Airport,Flight};