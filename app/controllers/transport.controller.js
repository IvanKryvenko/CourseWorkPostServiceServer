const Transport = require("../models/transport.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const transport = new Transport({
    mark: req.body.mark,
    licensePlateNumber: req.body.licensePlateNumber,
    driverName: req.body.driverName,
    transportType: req.body.transportType,
    releaseDate: req.body.releaseDate,
    capacity: req.body.capacity
  });

  Transport.create(transport, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the transport."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Transport.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transports"
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Transport.findByReleaseDateAndCapacity(req.body.releaseDate, req.body.capacity,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving "
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

  Transport.updateByLicensePlate(
    new Transport(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found.`
          });
        } else {
          res.status(500).send({
            message: "Error updating "
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Transport.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete "
        });
      }
    } else res.send({ message: `transport was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Transport.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all transport."
      });
    else res.send({ message: `All transport were deleted successfully!` });
  });
};