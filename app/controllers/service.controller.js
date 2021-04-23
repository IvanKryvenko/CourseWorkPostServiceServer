const Service = require("../models/service.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const service = new Service({
    serviceName: req.body.serviceName,
    serviceCustomer: req.body.serviceCustomer,
    paymentType: req.body.paymentType,
    servicePrice: req.body.servicePrice,
    serviceRating: req.body.serviceRating
  });

  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the service."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving service."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Service.findByPriceAndRating(req.body.servicePrice, req.body.serviceRating,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.serviceRating}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.serviceRating
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Service.updateByServiceName(
    new Service(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${req.body.serviceName}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating " + req.body.serviceName
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Service.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.serviceName}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete " + req.body.serviceName
        });
      }
    } else res.send({ message: `service was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    PostOffice.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all services."
      });
    else res.send({ message: `All services were deleted successfully!` });
  });
};