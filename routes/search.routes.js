const {findFlights, search, bookFlight, completeBooking} = require('../controllers/search.controller')
const routes= require('express').Router()


routes.get('', search)
routes.get('/findFlights', findFlights)
routes.get('/bookFlight', bookFlight)
routes.post('/completeBooking', completeBooking)


module.exports = routes