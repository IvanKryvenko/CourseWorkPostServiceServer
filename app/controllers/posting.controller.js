const Posting = require("../models/posting.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const posting = new Posting({
    deliveryNumber: body.reqdeliveryNumber,
    sender: body.reqsender,
    receiver: body.reqreceiver,
    senderPostOffice: body.reqsenderPostOffice,
    receiverPostOffice: body.reqreceiverPostOffice,
    sendTime: body.reqsendTime,
    deliveryTime: body.reqdeliveryTime,
    goodType: body.reqgoodType,
    deliveryType: body.reqdeliveryType
  });

  Posting.create(posting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the posting."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Posting.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postings."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Posting.findByDeliveryTimeAndDeliveryType(req.body.deliveryTime, req.body.deliveryType,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.deliveryType}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.deliveryType
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

  Posting.updateByDeliveryNumber(
    new Posting(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${req.body.deliveryNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating " + req.body.deliveryNumber
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Posting.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.deliveryNumber}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete " + req.body.deliveryNumber
        });
      }
    } else res.send({ message: `delivery was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Posting.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deliveries."
      });
    else res.send({ message: `All deliveries were deleted successfully!` });
  });
};