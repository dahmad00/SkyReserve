
const Booking=require('../models/Book')


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ExpiryTime) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
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
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Booking.",
        });
      });
  };

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0

 Booking.findAll({ 
   limit: limit,
   offset:offset,
    })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Bookings.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Booking with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Booking with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
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
        res.send({
          message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`,
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

  Booking.destroy({
    where: { SeatID :id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Booking with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Booking were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Booking.",
      });
    });
};


