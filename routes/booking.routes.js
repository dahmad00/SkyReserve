const  bookings=require('../controllers/booking.controller');
var router = require("express").Router();


// Create a new customer
router.post("/", bookings.create);
router.get("/", bookings.findAll);
router.get("/:id", bookings.findOne);
router.put("/:id", bookings.update);
router.delete("/:id", bookings.delete);
router.delete("/", bookings.deleteAll);
module.exports = router;
