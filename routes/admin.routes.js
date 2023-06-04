const  {index, addAirport,createAirport,addFlight,createFlight }=require('../controllers/admin.controller');
var router = require("express").Router();


// Create a new customer
router.get('/', index)
router.get('/addAirport', addAirport)
router.get('/addFlight', addFlight)
router.post('/airport', createAirport)
router.post('/flight', createFlight)
module.exports = router;
