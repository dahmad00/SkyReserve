const express = require('express')
const app = express()
var mysql = require('mysql2/promise')


const router=require("./indexroutes")
app.use('/',router)

const cust_model=require('./models/customer')
cust_model.customer();

const airport=require('./models/Airport')
airport.airport();
const book=require('./models/Booking')
book.booking();
const flight=require('./models/Flight')
flight.flight();
const payment=require('./models/Payment')
payment.payment();
const seat=require('./models/Seat')
seat.seat();

cust_model.hasMany(book,{foreignKey:'bookingID',as:'booking'});
book.belongsTo(cust_model,{foreignKey:'bookingID',as:'booking'});



cust_model.hasMany(payment,{foreignKey:'paymentID',as:'payment'});
payment.belongsTo(cust_model,{foreignKey:'paymentID',as:'payment'});


book.belongsTo(seat,{foreignKey:'seatID'});
seat.belongsTo(book,{foreignKey:'seatID'});


airport.hasMany(flight,{foreignKey:'flightID',as:'flightreserving'});
flight.hasMany(airport,{foreignKey:'flightID',as:'flightreserving'});


flight.hasMany(seat);
seat.hasMany(flight);

app.listen(3000)