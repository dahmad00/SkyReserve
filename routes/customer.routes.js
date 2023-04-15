const customer=require('../controllers/customer.controller')
var router = require("express").Router();


// Create a new customer
router.post("/", customer.create);
router.get("/", customer.findAll);
router.get("/:id", customer.findOne);
router.put("/:id", customer.update);
router.delete("/:id", customer.delete);
router.delete("/", customer.deleteAll);
module.exports = router;
