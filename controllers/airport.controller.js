const Airport=require('../models/Airport')

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
        res.status(500).send({
          message:
            err.message || "Some error occurred while occupping the Airport.",
        });
      });
  };

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0

 Airport.findAll({ 
   limit: limit,
   offset:offset,
    })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving all Airport.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

 Airport.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Airport with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in retrieving Airport with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
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
        res.send({
          message: `Cannot update Airport with id=${id}. Maybe Airport was not found or req.body is empty!`,
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

  Airport.destroy({
    where: {  AirportID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Airport was deleted(Free) successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete(free) Airport with id=${id}. Maybe Airport was not available!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Airport with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Airport.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Airport were deleted(freed) successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while freeing all Airport.",
      });
    });
};


