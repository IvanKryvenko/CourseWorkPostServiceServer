const sql = require("./index.js");

// constructor
const Service = function(service) {
  this.serviceName = service.serviceName;
  this.serviceCustomer = service.serviceCustomer;
  this.paymentType = service.paymentType;
  this.servicePrice = service.servicePrice;
  this.serviceRating = service.serviceRating;
};

Service.create = (newService, result) => {
  sql.query("INSERT INTO service SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created service: ", {  ...newService });
    result(null, { ...newService });
  });
};

Service.findByPriceAndRating = (price, rating, result) => {
  sql.query(`SELECT * FROM service WHERE price = ${price} AND rating = ${rating}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post sevice: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Service.getAll = result => {
  sql.query("SELECT * FROM service", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("services: ", res);
    result(null, res);
  });
};

Service.updateByServiceName = (service, result) => {
  sql.query(
    "UPDATE service SET serviceName = ?, serviceCustomer = ?, paymentType = ?, servicePrice = ?, serviceRating = ? WHERE serviceName = ? AND serviceCustomer = ?",
    [service.serviceName, service.serviceCustomer, service.paymentType, service.servicePrice, service.serviceRating, service.serviceName, service.serviceCustomer],
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

      console.log("updated service: ", { ...service });
      result(null, { ...service });
    }
  );
};

Service.remove = (service, result) => {
  sql.query("DELETE FROM service WHERE serviceName = ? AND serviceCustomer = ?", [service.serviceName, service.serviceCustomer], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted service", service.serviceName, service.serviceCustomer);
    result(null, res);
  });
};

module.exports = Service;