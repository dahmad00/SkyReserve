
const customer = require('./Customer')
const airport = require('./Airport')
const booking = require('./Book')
const flight = require('./Flight')
const seat = require('./Seat')
const connection = require('../connection')

exports.customer = customer
exports.airport = airport
exports.booking = booking
exports.flight = flight
exports.seat = seat

//Associations
airport.hasOne(flight, {
    foreignKey: {
        allowNull: false,
        name: "airport_from"
    }
})

airport.hasOne(flight, {
    foreignKey: {
        allowNull: false,
        name: "airport_to"
    }
})

flight.hasMany(seat, {
    foreignKey: {
        allowNull:false,
        name: 'FlightID'
    }
});

seat.hasOne(booking, {
    foreignKey: {
        allowNull:false,
        name: 'SeatID'
    }
})

customer.hasOne(booking, {
    foreignKey: {
        allowNull:false,
        name: 'CustomerID'
    }
})


connection.sync().then(() => {
    console.log('Database configured for associations!');
 }).catch((error) => {
    console.error('Unable to configure database for associations : ', error);
 });