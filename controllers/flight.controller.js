const { sequelize, DataTypes } = require('../connection')
const Flight = require('../models/Flight')
const Op = sequelize.Op;
const ErrorHandler = require('../utils/ErrorHandler')

// Create and Save a new Flight
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.Airplane) {
    error = new ErrorHandler('EmptyContentError', 400)
    next(error, req, res)
  }

  // Create a Tutorial
  const flight = {
    Airplane: req.body.Airplane,
    DepartureTime: req.body.DepartureTime,
    ArrivalTime: req.body.ArrivalTime
  };

  // Save Tutorial in the database
  Flight.create(flight)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      error = new ErrorHandler('ContentCreationError', 500)
      next(error, req, res)
    });
};

// Retrieve all Flight from the database.
exports.findAll = (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6
  const offset = req.query.offset ? parseInt(req.query.offset) : 0
  Flight.findAll({
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      error = new ErrorHandler('ContentRetreivalError', 500)
      next(error, req, res)
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Flight.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        error = new ErrorHandler('RecordNotFound', 404)
        next(error, req, res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('ContentRetreivalError', 500)
      next(error, req, res)
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  console.log("HEREEEUPDATEEE")

  Flight.update(req.body, {
    where: { FlightID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flight was updated successfully.",
        });
      } else {
        error = new ErrorHandler('ContentUpdationError', 500)
        next(error, req, res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('ContentUpdationError', 500)
      next(error, req, res)
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Flight.destroy({
    where: { FlightID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flight was deleted successfully!",
        });
      } else {
        error = new ErrorHandler('EmptyContentError',500)
        next(error, req,res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('RecordNotPresent',404)
      next(error, req,res)
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res, next) => {
  Flight.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      error = new ErrorHandler('UnknownDeletionError',500)
      next(error, req,res)
    });
};


