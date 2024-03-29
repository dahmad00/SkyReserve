
const Customer = require('../models/Customer')
const ErrorHandler = require('../utils/ErrorHandler')


// Create and Save a new Customer
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.Name) {
    error = new ErrorHandler('EmptyContentError', 400)
    next(error, req, res)
  }

  // Create a Tutorial
  const customer = {
    // CustomerID: req.body.CustomerID,
    Name: req.body.Name,
    DOB: req.body.DOB,
    Gender: req.body.Gender
  };

  // Save Tutorial in the database
  Customer.create(customer)
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

  Customer.findAll({
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

  Customer.findByPk(id)
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

  Customer.update(req.body, {
    where: { CustomerID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
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

  Customer.destroy({
    where: { CustomerID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
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
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums}  Customer were deleted successfully!` });
    })
    .catch((err) => {
      error = new ErrorHandler('UnknownDeletionError',500)
      next(error, req,res)
    });
};


