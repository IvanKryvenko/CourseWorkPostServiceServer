const sql = require("./db.js");

// constructor
const City = function(city) {
  this.cityName = city.cityName;
  this.country = city.country;
  this.square = city.square;
  this.infrastructureLevel = city.infrastructureLevel;
  this.popularity = city.popularity;
  this.postOfficesCount = city.postOfficesCount;
};

Customer.create = (newCity, result) => {
  sql.query("INSERT INTO city SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created city: ", {  ...newCity });
    result(null, { ...newCity });
  });
};

Customer.findByPopularityAndPostOfficesCount = (popularity, postOfficesCount, result) => {
  sql.query(`SELECT * FROM customers WHERE popularity = ${popularity} AND postOfficesCount = ${postOfficesCount}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found city: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM city", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cities: ", res);
    result(null, res);
  });
};

Customer.updateById = (city, result) => {
  sql.query(
    "UPDATE city SET country = ?, cityName = ?, square = ?, infrastructureLevel = ?, popularity = ?, postOfficesCount = ? WHERE country = ? AND cityName = ? AND square = ?",
    [city.cityName, city.country, city.square, city.infrastructureLevel, city.popularity, city.postOfficesCount],
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

      console.log("updated city: ", { ...city });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (city, result) => {
  sql.query("DELETE FROM city WHERE cityName = ? AND country = ? AND square = ?", city, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted city", city.name);
    result(null, res);
  });
};


module.exports = City;