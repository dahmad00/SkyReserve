
const Booking = require('../models/Book')
const ErrorHandler = require('../utils/ErrorHandler')

// Create and Save a new Customer
exports.create = (req, res, next) => {
  // Validate request


  if (!req.body.ExpiryTime) {
    error = new ErrorHandler('EmptyContentError', 400)
    next(error, req, res)
  }

  // Create a Tutorial
  const booking = {
    ExpiryTime: req.body.ExpiryTime
  };

  // Save Tutorial in the database
  Booking.create(booking)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      error = new ErrorHandler('ContentCreationError', 500)
      next(error, req, res)
    });
};

// Retrieve all Customer from the database.
exports.findAll = (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6
  const offset = req.query.offset ? parseInt(req.query.offset) : 0

  Booking.findAll({
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

  Booking.findByPk(id)
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

  Booking.update(req.body, {
    where: { BookingID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was updated successfully.",
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


  Booking.destroy({
    where: { SeatID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was deleted successfully!",
        });
      } else {
        error = new ErrorHandler('EmptyContentError', 500)
        next(error, req, res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('RecordNotPresent', 404)
      next(error, req, res)
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res, next) => {
  Booking.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Booking were deleted successfully!` });
    })
    .catch((err) => {
      error = new ErrorHandler('UnknownDeletionError', 500)
      next(error, req, res)
    });
};


