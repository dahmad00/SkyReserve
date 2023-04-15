
const Customer=require('../models/customer')


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
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
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer.",
        });
      });
  };

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0

 Customer.findAll({ 
   limit: limit,
   offset:offset,
   })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving tutorials.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { CustomerID : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe  Customer  was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
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
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe  Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums}  Customer were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all  Customer.",
      });
    });
};


