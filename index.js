const express = require('express');

const {sequelize,DataTypes}=require('./connection')

//const cors = require("cors");
const app = express();

const customerRoutes = require('./routes/customer.routes');
const seatRoutes = require('./routes/seat.routes');
const bookingRoutes = require('./routes/booking.routes');
const flightRoutes = require('./routes/flight.routes');
const airportRoutes = require('./routes/airport.routes');
const paymentRoutes = require('./routes/payment.routes');


const customer = require('./models/customer')
const airport = require('./models/Airport')
const booking = require('./models/Book')
const flight = require('./models/Flight')
const payment = require('./models/Payment')
const seat = require('./models/Seat')

//Associations b/w tables

const { air, flig } = require('./models/airport_flight')
const { custt, pay } = require('./models/cust_pay')
const { bok, seatt } = require('./models/book_seat')
const { fligh, sett } = require('./models/flight_seat')
const { cust, book } = require('./models/cust_book')



//API's 

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/customers", customerRoutes);
sequelize.sync().then(() => {
  console.log("Synced customer db.");
})
  .catch((err) => {
    console.log("Failed to sync customer db: " + err.message);
  });

app.use("/api/seats", seatRoutes);
sequelize.sync().then(() => {
  console.log("Synced seat db.");
})
  .catch((err) => {
    console.log("Failed to sync seat db: " + err.message);
  });

app.use("/api/bookings", bookingRoutes);
sequelize.sync().then(() => {
  console.log("Synced booking db.");
})
  .catch((err) => {
    console.log("Failed to sync booking db: " + err.message);
  });

app.use("/api/flight", flightRoutes);
sequelize.sync().then(() => {
  console.log("Synced flight db.");
})
  .catch((err) => {
    console.log("Failed to sync flight db: " + err.message);
  });

app.use("/api/airport", airportRoutes);
sequelize.sync().then(() => {
  console.log("Synced airport db.");
})
  .catch((err) => {
    console.log("Failed to sync airport db: " + err.message);
  });

app.use("/api/payment", paymentRoutes);
sequelize.sync().then(() => {
  console.log("Synced payment db.");
})
  .catch((err) => {
    console.log("Failed to sync payment db: " + err.message);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});


// customer.hasMany(booking,{foreignKey:'BookingID',as:'Booking'});
// customer.hasMany(payment,{foreignKey:'paymentID',as:'payment'});
// booking.belongsTo(seat,{foreignKey:'seatID'});
// airport.hasMany(flight,{foreignKey:'flightID',as:'flightreserving'});
// flight.hasMany(seat);


app.listen(3000);
