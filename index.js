const express = require('express')
const app = express()
var mysql = require('mysql2/promise')


const router=require("./indexroutes")
app.use('/',router)

//const userModel = require('./models/user')
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


//userModel.createUser();


// async function queryFunction() {
//     var connection = await mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'books'
//       });
//     [con] = await connection.execute(
//         'SELECT * FROM book'
//     );    

//     console.log(con)
// }

// queryFunction();





app.listen(3000)