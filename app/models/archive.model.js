const sql = require("./index.js");

// constructor
const Archive = function(archive) {
  this.deliveryNumber = archive.deliveryNumber;
  this.receiveDate = archive.receiveDate;
  this.arriveDate = archive.arriveDate;
  this.issuedEmployee = archive.issuedEmployee;
  this.payment = archive.payment;
  this.deliveryStatus = archive.deliveryStatus;
  this.sum = archive.sum;
};

Archive.create = (newArchivedDelivery, result) => {
  sql.query("INSERT INTO archive SET ?", newArchiveDelivery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created archived delivery: ", {  ...newArchivedDelivery });
    result(null, { ...newArchivedDelivery });
  });
};

Archive.findByIssuedEmployeeAndSum = (issuedEmployee, sum, result) => {
  sql.query(`SELECT * FROM archive WHERE issuedEmployee = ${issuedEmployee} AND sum > ${sum}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found archived delivery: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Archive.getAll = result => {
  sql.query("SELECT * FROM archive", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("archive: ", res);
    result(null, res);
  });
};

Archive.updateByDeliveryNumber = (archive, result) => {
  sql.query(
    "UPDATE archive SET receiveDate = ?, arriveDate = ?, issuedEmployee = ?, payment = ?, deliveryStatus = ?, sum = ? WHERE deliveryNumber = ?",
    [archive.receiveDate, archive.arriveDate, archive.issuedEmployee, archive.payment, archive.deliveryStatus, archive.sum, archive.deliveryNumber],
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

      console.log("updated archived delivery: ", { ...archive });
      result(null, { ...archive });
    }
  );
};

Archive.remove = (archive, result) => {
  sql.query("DELETE FROM archive WHERE deliveryNumber = ?", archive, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted archived delivery", archive.deliveryNumber);
    result(null, res);
  });
};


module.exports = Archive;