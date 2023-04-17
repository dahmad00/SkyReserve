const Seat = require('../models/Seat')
const ErrorHandler = require('../utils/ErrorHandler')

// Create and Save a new Customer
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.Type) {
    error = new ErrorHandler('EmptyContentError', 500)
    next(error, req, res)
  }

  // Create a Tutorial
  const seat = {
    Type: req.body.Type,
    Position: req.body.Position,
  };

  // Save Tutorial in the database
  Seat.create(seat)
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

  Seat.findAll({
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

  Seat.findByPk(id)
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

  Seat.update(req.body, {
    where: { SeatID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Seat was updated successfully.",
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

  Seat.destroy({
    where: { SeatID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Seat was deleted(Free) successfully!",
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
  Seat.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Seat were deleted(freed) successfully!` });
    })
    .catch((err) => {
      error = new ErrorHandler('UnknownDeletionError', 500)
      next(error, req, res)
    });
};


