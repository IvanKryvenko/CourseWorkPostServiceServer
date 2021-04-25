const Client = require("../models/client.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const client = new Client({
    clientName: req.bodyclientName,
    phoneNumber: req.bodyphoneNumber,
    email: req.bodyemail,
    city: req.bodycity,
    age: req.bodyage,
    deliveryCount: req.bodydeliveryCount
  });

  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Client.findByDeliveryCountAndAge(req.body.deliveryCount, req.body.age,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.deliveryCount}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.deliveryCount
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

  Client.updateByEmail(
    new Client(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${req.body.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating " + req.body.email
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Client.remove(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete " + req.body.email
        });
      }
    } else res.send({ message: `client was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clients."
      });
    else res.send({ message: `All clients were deleted successfully!` });
  });
};