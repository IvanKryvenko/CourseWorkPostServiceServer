const sql = require("./index.js");

// constructor
const Posting = function(posting) {
  this.deliveryNumber = posting.deliveryNumber;
  this.sender = posting.sender;
  this.receiver = posting.receiver;
  this.senderPostOffice = posting.senderPostOffice;
  this.receiverPostOffice = posting.receiverPostOffice;
  this.sendTime = posting.sendTime;
  this.deliveryTime = posting.deliveryTime;
  this.goodType = posting.goodType;
  this.deliveryType = posting.deliveryType;
};

Posting.create = (newDelivery, result) => {
  sql.query("INSERT INTO delivery SET ?", newDelivery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created delivery: ", {  ...newDelivery });
    result(null, { ...newDelivery });
  });
};

Posting.findByDeliveryTimeAndDeliveryType = (deliveryType, deliveryTime, result) => {
  sql.query(`SELECT * FROM delivery WHERE deliveryType = ${deliveryType} AND deliveryTime = ${deliveryTime}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found delivery: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Posting.getAll = result => {
  sql.query("SELECT * FROM delivery", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deliveries: ", res);
    result(null, res);
  });
};

Posting.updateByDeliveryNumber = (delivery, result) => {
  sql.query(
    "UPDATE delivery SET sender = ?, receiver = ?, senderPostOffice = ?, receivePostOffice = ?, sendTime = ?, deliveryTime = ?, goodType = ?, deliveryType = ? WHERE deliveryNumber = ?",
    [delivery.sender, delivery.receiver, delivery.senderPostOffice, delivery.receiverPostOffice, delivery.sendTime, delivery.deliveryTime, delivery.goodType, delivery.deliveryType, delivery.deliveryNumber],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated delivery: ", delivery.deliveryNumber);
      result(null, { ...delivery });
    }
  );
};

Posting.remove = (delivery, result) => {
  sql.query("DELETE FROM delivery WHERE deliveryNumber = ?", delivery.deliveryNumber, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted delivery", delivery.deliveryNumber);
    result(null, res);
  });
};


module.exports = Posting;