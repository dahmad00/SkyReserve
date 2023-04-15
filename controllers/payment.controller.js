const Payment=require('../models/Payment')


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Method) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    // Create a Tutorial
    const payment = {
        Method: req.body.Method,
        Amount: req.body.Amount,
    };
  
    // Save Tutorial in the database
    Payment.create(payment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while occupping the Payment.",
        });
      });
  };

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0

 Payment.findAll({ 
   limit: limit,
   offset:offset,
    })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving all Payment.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

 Payment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Payment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in retrieving Payment with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payment.update(req.body, {
    where: { PaymentID : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Booking with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { PaymentID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Payment was not available!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Payment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Payment were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Payment.",
      });
    });
};


