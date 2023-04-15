const  airports=require('../controllers/airport.controller');
var router = require("express").Router();


// Create a new customer
router.post("/", airports.create);
router.get("/", airports.findAll);
router.get("/:id", airports.findOne);
router.put("/:id", airports.update);
router.delete("/:id", airports.delete);
router.delete("/", airports.deleteAll);
module.exports = router;
