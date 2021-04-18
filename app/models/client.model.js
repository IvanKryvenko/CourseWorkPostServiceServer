const sql = require("./index.js");

// constructor
const Client = function(client) {
  this.clientName = client.clientName;
  this.phoneNumber = client.phoneNumber;
  this.email = client.email;
  this.city = client.city;
  this.age = client.age;
  this.deliveryCount = client.deliveryCount;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", {  ...newClient });
    result(null, { ...newClient });
  });
};

Client.findByEmail = (deliveryCount, age, result) => {
  sql.query(`SELECT * FROM client WHERE deliveryCount = ${deliveryCount} AND age >= ${age}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Client.getAll = result => {
  sql.query("SELECT * FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("client: ", res);
    result(null, res);
  });
};

Client.updateById = (client, result) => {
  sql.query(
    "UPDATE client SET clientName = ?, phoneNumber = ?, email = ?, city = ?, age = ?, deliveryCount = ? WHERE email = ?",
    [client.name, client.phoneNumber, client.email, client.city, client.age, client.deliveryCount],
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

      console.log("updated client: ", { ...client });
      result(null, { ...client });
    }
  );
};

Client.remove = (client, result) => {
  sql.query("DELETE FROM client WHERE email = ?", client.email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted client", client.clientName);
    result(null, res);
  });
};


module.exports = Client;