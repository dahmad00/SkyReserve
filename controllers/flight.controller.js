const {sequelize,DataTypes}=require('../connection')
const Flight=require('../models/Flight')
const Op =sequelize.Op;

// Create and Save a new Flight
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Airplane) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
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
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Flight.",
        });
      });
  };

// Retrieve all Flight from the database.
exports.findAll = (req, res) => {
  const limit =  req.query.limit ? parseInt(req.query.limit): 6
  const offset =  req.query.offset ? parseInt(req.query.offset): 0
 Flight.findAll({ 
   limit: limit,
   offset:offset,
   })
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Flight.",
     });
   });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flight.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Flight with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Flight with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Flight.update(req.body, {
    where: { FlightID : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flight was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Flight with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Flight with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Flight.destroy({
    where: { FlightID : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flight was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Flight with id=${id}. Maybe Tutorial was not found!`,
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
  Flight.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};


