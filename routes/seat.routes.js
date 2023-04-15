const  seats=require('../controllers/seat.controller');
var router = require("express").Router();


// Create a new customer
router.post("/", seats.create);
router.get("/", seats.findAll);
router.get("/:id", seats.findOne);
router.put("/:id", seats.update);
router.delete("/:id", seats.delete);
router.delete("/", seats.deleteAll);
module.exports = router;
