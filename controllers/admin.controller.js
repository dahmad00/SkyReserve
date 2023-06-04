const {customer, airport, booking, flight, seat} = require('../models/all_models')
const sequelize = require('../connection')

exports.index = function(req,res, next) {
    res.render('admin/index')
}

exports.addAirport = function(req,res, next) {
    res.render('admin/add_airport')
}

exports.addFlight = function(req,res, next) {
    airport.findAll({
        attributes: [sequelize.fn('DISTINCT', sequelize.col('Name')), 'Name']
    }).then(function(result) {
        
        var names= []
        for (let i = 0; i < result.length; i++) {
            names.push(result[i].dataValues.Name)   
        }
        res.render('admin/add_flight', {Names: names})
    }).catch(
        (error)=> console.log(error)
    )
}

exports.createAirport = function(req,res,next) {
    console.log(req.params)
    console.log(req.body)

    airport.create({
        Name: req.body.name,
        Location: req.body.location
    }).then(()=> {
      res.render('admin/success', {message:'The airport was succesfuly added. Now you can add flights to it'})  
    })
}

exports.createFlight = function(req,res,next) {
    console.log(req.body)
    var from = req.body.from
    var to = req.body.to
    var departure = req.body.departure
    var arrival = req.body.arrival
    var econ_total = req.body['econ-total']
    var econ_fare = req.body['econ-fare']
    var business_total = req.body['business-total']
    var business_fare = req.body['business-fare']
    var airplane = req.body['airplane']

    var flight_data = {
        Airplane: airplane,
        Departure: departure,
        Arrival: arrival,
        Economy_total: econ_total,
        Economy_Avail: econ_total,
        Economy_Fare: econ_fare,
        Business_total: business_total,
        Business_Avail: business_total,
        Business_Fare: business_fare,
        airport_from: '', //to be added
        airport_to: '' //to be added
    }
    

    getAirportsFromNames(from, to).then(
        ({from_id, to_id})=> {
            flight_data.airport_from = from_id
            flight_data.airport_to = to_id
            flight.create(flight_data).then(
                res.render('admin/success', {message:'The flight was succesfuly added'})  
            ).catch(
                (error) => {
                    console.log(error)
                    console.log(flight_data)
                }
            )
        })


}

async function getAirportsFromNames(from, to) {
    from_airport = await airport.findOne({
        where: {
            Name: from
        }
    })
    to_airport = await airport.findOne({
        where: {
            Name: to
        }
    })
    from_id = from_airport.AirportID
    to_id = to_airport.AirportID
    
    console.log(from_id)
    console.log(to_id)

    return {from_id, to_id}
}

function addConstraintToAirport() {
    interface = sequelize.getQueryInterface()
    interface.addConstraint('airports', {
        fields: ['Location'],
        type:'unique'
    })
}