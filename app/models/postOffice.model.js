const sql = require("./index.js");

// constructor
const PostOffice = function(postOffice) {
  this.city = postOffice.city;
  this.officeNumber = postOffice.officeNumber;
  this.address = postOffice.address;
  this.officeType = postOffice.officeType;
  this.weightLimit = postOffice.weightLimit;
  this.workersCount = postOffice.workersCount;
};

PostOffice.create = (newPostOffice, result) => {
  sql.query("INSERT INTO postOffice SET ?", newPostOffice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created postOffice: ", {  ...newPostOffice });
    result(null, { ...newPostOffice });
  });
};

PostOffice.findByWeightLimitAndWorkersCount = (weightLimit, workersCount, result) => {
  sql.query(`SELECT * FROM postOffice WHERE weightLimit = '${weightLimit}' AND workersCount = ${workersCount}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post office: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

PostOffice.getAll = result => {
  sql.query("SELECT * FROM postOffice", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("post offices: ", res);
    result(null, res);
  });
};

PostOffice.updateByCity = (postOffice, result) => {
  sql.query(
    "UPDATE postOffice SET address = ?, officeType = ?, weightLimit = ?, workersCount = ? WHERE city = ? AND officeNumber = ?",
    [postOffice.address, postOffice.officeType, postOffice.weightLimit, postOffice.workersCount, postOffice.city, postOffice.officeNumber],
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

      console.log("updated office: ", { ...postOffice });
      result(null, { ...postOffice });
    }
  );
};

PostOffice.remove = (postOffice, result) => {
  sql.query("DELETE FROM postOffice WHERE city = ? AND officeNumber = ?", [postOffice.city, postOffice.officeNumber], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted office", postOffice.city, postOffice.officeNumber);
    result(null, res);
  });
};

module.exports = PostOffice;