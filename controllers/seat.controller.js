const Seat=require('../models/Seat')


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Type) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
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
        res.status(500).send({
          message:
            err.message || "Some error occurred while occupping the Seat.",
        });
      });
  };

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0

 Seat.findAll({ 
   limit: limit,
   offset:offset,
    })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving all seat.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

 Seat.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Seat with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in retrieving Seat with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Seat.update(req.body, {
    where: { SeatID : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Seat was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Seat with id=${id}. Maybe Seat was not found or req.body is empty!`,
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

  Seat.destroy({
    where: { SeatID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Seat was deleted(Free) successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete(free) Seat with id=${id}. Maybe Seat was not available!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Seat with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Seat.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Seat were deleted(freed) successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while freeing all Seat.",
      });
    });
};


