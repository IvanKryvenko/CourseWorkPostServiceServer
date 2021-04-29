const Archive = require("../models/archive.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const archive = new Archive({
    deliveryNumber: req.body.deliveryNumber,
    receiveDate: req.body.receiveDate,
    arriveDate: req.body.arriveDate,
    issuedEmployee: req.body.issuedEmployee,
    payment: req.body.payment,
    deliveryStatus: req.body.deliveryStatus,
    sum: req.body.sum
  });

  Archive.create(archive, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the arhive."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Archive.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving archive."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Archive.findByIssuedEmployeeAndSum(req.body.issuedEmployee, req.body.sum, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found archive ${req.body.issuedEmployee} ${req.body.sum}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving archived delivery " + req.body.issuedEmployee + " " + req.body.sum
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Archive.updateByDeliveryNumber(
    new Archive(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found archived delivery with deliveryNumber ${req.body.deliveryNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating archived delivery with deliveryNumber " + req.body.deliveryNumber
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Archive.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found archived delivery with deliveryNumber ${req.body.deliveryNumber}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete archived delivery with deliveryNumber " + req.body.deliveryNumber
        });
      }
    } else res.send({ message: `archived delivery was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Archive.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all archive."
      });
    else res.send({ message: `All archive were deleted successfully!` });
  });
};