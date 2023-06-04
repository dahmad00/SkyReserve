const express = require('express');
const app = express();
const path=require('path');
const multer  = require('multer');
const connection = require('./connection')
const {customer, airport, booking, flight, seat} = require('./models/all_models')
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
    console.log(file)
    cb(null,  uniqueSuffix)
  }
})
const uploads = multer({ storage: storage })
app.set('view engine', 'ejs');

app.get('/upload', function(req, res) {
  res.render('upload');
});

app.post('/upload', uploads.single('image'),function(req, res) {
  res.send('image uploaded');
});

const {sequelize,DataTypes}=require('./connection')
const errorMiddleWare = require('./middleware/error')

//const cors = require("cors");


// const customerRoutes = require('./routes/customer.routes');
// const seatRoutes = require('./routes/seat.routes');
// const bookingRoutes = require('./routes/booking.routes');
// const flightRoutes = require('./routes/flight.routes');
// const airportRoutes = require('./routes/airport.routes');
const indexRoutes = require('./routes/index.routes')
const searchRoutes = require('./routes/search.routes')
const adminRoutes = require('./routes/admin.routes')


// //Associations b/w tables

// const { air, flig } = require('./models/airport_flight')
// const { custt, pay } = require('./models/cust_pay')
// const { bok, seatt } = require('./models/book_seat')
// const { fligh, sett } = require('./models/flight_seat')
// const { cust, book } = require('./models/cust_book')



//API's 


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('lib'))

app.use("/search",searchRoutes)
app.use("/admin",adminRoutes)
app.use(indexRoutes);



// app.use("/api/customers", customerRoutes);
// connection.sync().then(() => {
//   console.log("Synced customer db.");
// })
//   .catch((err) => {
//     console.log("Failed to sync customer db: " + err.message);
//   });

// app.use("/api/seats", seatRoutes);
// connection.sync().then(() => {
//   console.log("Synced seat db.");
// })
//   .catch((err) => {
//     console.log("Failed to sync seat db: " + err.message);
//   });

// app.use("/api/bookings", bookingRoutes);
// connection.sync().then(() => {
//   console.log("Synced booking db.");
// })
//   .catch((err) => {
//     console.log("Failed to sync booking db: " + err.message);
//   });

// app.use("/api/flight", flightRoutes);
// connection.sync().then(() => {
//   console.log("Synced flight db.");
// })
//   .catch((err) => {
//     console.log("Failed to sync flight db: " + err.message);
//   });

// app.use("/api/airport", airportRoutes);
// connection.sync().then(() => {
//   console.log("Synced airport db.");
// })
//   .catch((err) => {
//     console.log("Failed to sync airport db: " + err.message);
//   });


app.use(errorMiddleWare)

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});

app.listen(3000);
