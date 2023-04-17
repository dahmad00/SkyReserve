const Airport = require('../models/Airport')
const ErrorHandler = require('../utils/ErrorHandler')

// Create and Save a new Customer
exports.create = (req, res, next) => {

  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

  // Validate request
  if (!req.body.Name) {
    // res.status(400).send({
    //   message: "Content can not be empty!",
    // });

    error = new ErrorHandler('EmptyContentError', 400)
    next(error, req, res)
  }

  // Create a Tutorial
  const airport = {
    Name: req.body.Name,
    Location: req.body.Location,
  };

  // Save Tutorial in the database
  Airport.create(airport)
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

  Airport.findAll({
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      error = new ErrorHandler('ContentAccessError', 500)
      next(error, req, res)
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Airport.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        error = new ErrorHandler('RecordNotFound',404)
        next(error, req,res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('RecordSelectionError',500)
        next(error, req,res)
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  Airport.update(req.body, {
    where: { AirportID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Airport was updated successfully.",
        });
      } else {
        error = new ErrorHandler('RecordNotFound',404)
        next(error, req,res)
      }
    })
    .catch((err) => {
      error = new ErrorHandler('EmptyContentError',500)
        next(error, req,res)
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Airport.destroy({
    where: { AirportID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Airport was deleted(Free) successfully!",
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
  Airport.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Airport were deleted(freed) successfully!` });
    })
    .catch((err) => {
      error = new ErrorHandler('UnknownDeletionError',500)
        next(error, req,res)
    });
};


