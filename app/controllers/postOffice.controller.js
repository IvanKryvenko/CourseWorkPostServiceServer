const PostOffice = require("../models/PostOffice.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const postOffice = new PostOffice({
    city: req.body.city,
    officeNumber: req.body.officeNumber,
    address: req.body.address,
    officeType: req.body.officeType,
    weightLimit: req.body.weightLimit,
    workersCount: req.body.workersCount
  });

  PostOffice.create(postOffice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post office."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    PostOffice.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving post office."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    PostOffice.findByWeightLimitAndWorkersCount(req.body.weightLimit, req.body.workersCount,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.workersCount}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.workersCount
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

  PostOffice.updateByCity(
    new PostOffice(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${req.body.city} ${req.body.officeNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating " + req.body.city + " " + req.body.officeNumber
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    PostOffice.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.city} ${req.body.officeNumber}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete " + req.body.city + " " + req.body.officeNumber
        });
      }
    } else res.send({ message: `post office was deleted successfully!` });
  });
};