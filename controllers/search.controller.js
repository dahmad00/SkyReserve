const {customer, airport, booking, flight, seat} = require('../models/all_models')
const sequelize = require('sequelize')
const {Op} = require('sequelize')
const Moment = require('moment') 

exports.search = function(req,res, next) {

    airport.findAll({
        attributes: [sequelize.fn('DISTINCT', sequelize.col('Location')), 'Location']
    }).then(function(result) {
        
        locations = []
        for (let i = 0; i < result.length; i++) {
            locations.push(result[i].dataValues.Location)   
        }
        res.render('pages/search', {Locations: locations})
    }).catch(
        (error)=> console.log(error)
    )
}

exports.completeBooking = (req,res,next) => {
    console.log(req.body)
    
    bookingID = Math.random().toString(36).slice(2)
    
    booking.create({
        BookingID: bookingID,
        Name: req.body.name,
        Email: req.body.email,
        CNIC: req.body.cnic
    }).then(
        ()=> {
            res.render('pages/success', {message: 'Booking Succesful. Your booking ID is ' + bookingID})
        }).catch(
            (error) => {
            console.log(error)
        })
}

exports.bookFlight = (req,res,next) => {

    req_data = JSON.parse(req.query.data)
    console.log(req_data)
    if(req_data.round) {

    } 
    else {
        getFlightByID(req_data.first.FlightID).then(
            (flight_data)=> {

                if (req_data.first.seat_type == 'Economy') {
                    flight_data.seat_type = 'Economy'
                    flight_data.fare = flight_data.dataValues.Economy_Fare
                } 
                else {
                    flight_data.fare = flight_data.dataValues.Business_Fare
                    flight_data.dataValues.seat_type = 'Business'
                }

                flight_data.today = new Date().toISOString().slice(0, 10)

                console.log(flight_data)
                res.render('pages/booking',{flight:flight_data})

            }
        )
    }

    res.render('pages/booking')
}

function getFlightByID(id) {
    console.log(id)
    var flight_data = flight.findOne({
        where: {
            FlightID:id
        }
    })

    return flight_data
}


exports.findFlights = (req,res,next) => {
    console.log(req.query)

    var from = req.query.from
    var to = req.query.to
    var departure_date = req.query.departure
    var arrival_date = req.query.arrival

    req.query.roundTrip = (req.query.roundTrip == 'true') ? true : false

    if (req.query.roundTrip) {

        getTwoWayFlights(from, to, departure_date, arrival_date).then(
            ({flight_list_departure, flight_list_arrival}) => {
                console.log(flight_list_departure)
                console.log(flight_list_arrival)
                res.json({
                    departure: flight_list_departure,
                    arrival: flight_list_arrival
                })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
            
    } 
    else {
        getOneWayFlights(from, to, departure_date).then(
            (flight_list) => {
                res.send(flight_list)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
}

async function getTwoWayFlights(from, to, departure, arrival) {
    airport_from = await airport.findOne({
        where: {
            Location:from
        }
    })
    airport_to = await airport.findOne({
        where: {
            Location:to
        }
    })

    from_id = airport_from.AirportID
    to_id = airport_to.AirportID

    flight_list_departure = await flight.findAll(
        {
            where: {
                [Op.and]: [
                    {
                        airport_from: from_id,
                        airport_to: to_id
                    },
                    sequelize.where(sequelize.fn('date', sequelize.col('Departure')), '=', departure)                        
                ]

            }
        }
    )

    for (let i = 0; i < flight_list_departure.length; i++) {
        airport_from = await airport.findOne(
            {
                where: {
                    AirportID: flight_list_departure[i].airport_from 
                }
            }
        )
        airport_to = await airport.findOne(
            {
                where: {
                    AirportID: flight_list_departure[i].airport_to
                }
            }
        )

        location_from = airport_from.Location
        location_to = airport_to.Location
        flight_list_departure[i].dataValues.location_to = location_to
        flight_list_departure[i].dataValues.location_from = location_from
        flight_list_departure[i].dataValues.date_departure = Moment(flight_list_departure[i].departure).format('MMMM Do, YYYY')
        flight_list_departure[i].dataValues.date_arrival = Moment(flight_list_departure[i].arrival).format('MMMM Do, YYYY')
    }


    flight_list_arrival = await flight.findAll(
        {
            where: {
                [Op.and]: [
                    {
                        airport_from: to_id,
                        airport_to: from_id
                    },
                    sequelize.where(sequelize.fn('date', sequelize.col('Departure')), '=', arrival)                        
                ]

            }
        }
    )

    for (let i = 0; i < flight_list_arrival.length; i++) {
        airport_from = await airport.findOne(
            {
                where: {
                    AirportID: flight_list_arrival[i].airport_from 
                }
            }
        )
        airport_to = await airport.findOne(
            {
                where: {
                    AirportID: flight_list_arrival[i].airport_to
                }
            }
        )

        location_from = airport_from.Location
        location_to = airport_to.Location
        flight_list_arrival[i].dataValues.location_to = location_to
        flight_list_arrival[i].dataValues.location_from = location_from
        flight_list_arrival[i].dataValues.date_departure = Moment(flight_list_arrival[i].departure).format('MMMM Do, YYYY')
        flight_list_arrival[i].dataValues.date_arrival = Moment(flight_list_arrival[i].arrival).format('MMMM Do, YYYY')
        
    }

    return {flight_list_departure, flight_list_arrival}
}


async function getOneWayFlights(from, to, departure) {
    airport_from = await airport.findOne({
        where: {
            Location:from
        }
    })
    airport_to = await airport.findOne({
        where: {
            Location:to
        }
    })

    from_id = airport_from.AirportID
    to_id = airport_to.AirportID

    flight_list = await flight.findAll(
        {
            where: {
                [Op.and]: [
                    {
                        airport_from: from_id,
                        airport_to: to_id
                    },
                    sequelize.where(sequelize.fn('date', sequelize.col('Departure')), '=', departure)                        
                ]

            }
        }
    )

    for (let i = 0; i < flight_list.length; i++) {
        airport_from = await airport.findOne(
            {
                where: {
                    AirportID: flight_list[i].airport_from 
                }
            }
        )
        airport_to = await airport.findOne(
            {
                where: {
                    AirportID: flight_list[i].airport_to
                }
            }
        )

        location_from = airport_from.Location
        location_to = airport_to.Location
        flight_list[i].dataValues.location_to = location_to
        flight_list[i].dataValues.location_from = location_from
        flight_list[i].dataValues.date_departure = Moment(flight_list[i].departure).format('MMMM Do, YYYY')
        flight_list[i].dataValues.date_arrival = Moment(flight_list[i].arrival).format('MMMM Do, YYYY')
    }

    console.log(flight_list)

    return flight_list
}




function addFlights() {
    flight.bulkCreate([
        {Airplane: 'PIA1', Departure: '2023-07-02T04:30:00.000', Arrival:'2023-07-02T07:30:00.000', airport_from: 1, airport_to: 2},
        {Airplane: 'PIA1', Departure: '2023-07-03T05:30:00.000', Arrival:'2023-01-07T08:30:00.000', airport_from: 2, airport_to: 1}
    ]).then(
                () => {
                    console.log("Valeus added")
                }
            ).catch(
                (error)=> {
                    console.log("COULD NOT ADD")
                    console.log(error)}
            )
}



// function addAirports() {
//     airport.bulkCreate([
//         {AirportID:1, Name: "Jinnah International Airport", Location: "Karachi"},
//         {AirportID:2, Name: "Iqbal International Airport", Location: "Lahore"},
//         {AirportID:3, Name: "Sir Syed International Airport", Location: "Faisalabad"},
//         {AirportID:4, Name: "Pakistan International Airport", Location: "Islamabad"},
//         {AirportID:5, Name: "KP Airport", Location: "Peshawar"},
//         {AirportID:6, Name: "Gillani Airport", Location: "Multan"},
//         {AirportID:7, Name: "BCH Airport", Location: "Quetta"},
//         {AirportID:8, Name: "Atatrutk Airport", Location: "Istanbul"},
//         {AirportID:9, Name: "Chinese International Airport", Location: "Shengai"},
//     ]).then(
//         () => {
//             console.log("Valeus added")
//         }
//     ).catch(
//         (error)=> {console.log(error)}
//     )
// }