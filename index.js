const express = require('express');
const app = express();
const path=require('path');
const multer  = require('multer');

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

app.use(errorMiddleWare)

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});

/*

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body)
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

//const upload = multer({ storage: storage })
//const storage = multer.memoryStorage()
//const upload = multer({ storage: storage })

*/
app.listen(3000);
