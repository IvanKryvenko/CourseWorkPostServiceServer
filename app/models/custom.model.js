const sql = require("./index.js");

// constructor
const Custom = function(custom) {
  this.employee = custom.serviceName;
  this.office = custom.serviceCustomer;
};

Custom.findByEmployeeAndOffice = (employee, office, result) => {
  sql.query(`SELECT delivery.deliveryNumber, payment FROM delivery, archive WHERE issuedEmployee = '${employee}' OR receiverPostOffice = '${office}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post sevice: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Custom;