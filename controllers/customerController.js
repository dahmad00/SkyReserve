const customer=require('../models/customer')

exports.getAllCustomer=(req,res)=>{
    const cust= customer.findAll({})
    res.status(200).send(cust)

};

exports.addCustomer=(req,res)=>{
   // Validate request
  if (!req.body.CustomerID) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    CustomerID: req.body.CustomerID,
    Name: req.body.Name,
    DOB: req.body.DOB,
    Gender: req.body.Gender,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });

};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { CustomerID: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id,
        });
      });
  };

exports.getCustomerBookings=(req,res)=>{
    const data= customer.findAll({
        include:[{
            model:booking,
            as:'booking'        }],
        include:[{
                model:payments,
                as:'payment'    }]
            
    })
    res.status(200).send(data)

};
