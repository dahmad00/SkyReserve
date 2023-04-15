const  flight=require('../controllers/flight.controller');
var router = require("express").Router();


// Create a new customer
router.post("/", flight.create);
router.get("/", flight.findAll);
router.get("/:id", flight.findOne);
router.put("/:id", flight.update);
router.delete("/:id", flight.delete);
router.delete("/", flight.deleteAll);
module.exports = router;
