const  payment=require('../controllers/payment.controller');
var router = require("express").Router();


// Create a new customer
router.post("/", payment.create);
router.get("/", payment.findAll);
router.get("/:id", payment.findOne);
router.put("/:id", payment.update);
router.delete("/:id", payment.delete);
router.delete("/", payment.deleteAll);
module.exports = router;
