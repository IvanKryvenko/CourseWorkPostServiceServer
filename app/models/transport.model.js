const sql = require("./index.js");

// constructor
const Transport = function(transport) {
  this.mark = transport.mark;
  this.licensePlateNumber = transport.licensePlateNumber;
  this.driverName = transport.driverName;
  this.transportType = transport.transportType;
  this.releaseDate = transport.releaseDate;
  this.capacity = transport.capacity;
};

Transport.create = (newTransport, result) => {
  sql.query("INSERT INTO transport SET ?", newTransport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transport: ", {  ...newTransport });
    result(null, { ...newTransport });
  });
};

Transport.findByReleaseDateAndCapacity = (releaseDate, capacity, result) => {
  sql.query(`SELECT * FROM transport WHERE releaseDate = ${releaseDate} AND capacity = '${capacity}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transport: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Transport.getAll = result => {
  sql.query("SELECT * FROM transport", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transports: ", res);
    result(null, res);
  });
};

Transport.updateByLicensePlate = (transport, result) => {
  sql.query(
    "UPDATE transport SET mark = ?, driverName = ?, transportType = ?, releaseDate = ?, capacity = ? WHERE licensePlateNumber = ?",
    [transport.mark, transport.driverName, transport.transportType, transport.releaseDate, transport.capacity, transport.licensePlateNumber],
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

      console.log("updated transport: ", { ...transport });
      result(null, { ...transport });
    }
  );
};

Transport.remove = (transport, result) => {
  sql.query("DELETE FROM transport WHERE licensePlateNumber = ? ", [transport.licensePlateNumber], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted transport", transport.licensePlateNumber);
    result(null, res);
  });
};

module.exports = Transport;