const sql = require("./index.js");

// constructor
const City = function(city) {
  this.cityName = city.cityName;
  this.country = city.country;
  this.square = city.square;
  this.infrastructureLevel = city.infrastructureLevel;
  this.popularity = city.popularity;
  this.postOfficesCount = city.postOfficesCount;
};

City.create = (newCity, result) => {
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

City.findByPopularityAndPostOfficesCount = (popularity, postOfficesCount, result) => {
  sql.query(`SELECT * FROM city WHERE popularity >= ${popularity} AND postOfficesCount = ${postOfficesCount}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found city: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

City.getAll = result => {
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

City.updateByCountryAndCityName = (city, result) => {
  sql.query(
    "UPDATE city SET square = ?, infrastructureLevel = ?, popularity = ?, postOfficesCount = ? WHERE country = ? AND cityName = ?",
    [city.square, city.infrastructureLevel, city.popularity, city.postOfficesCount, city.country, city.cityName],
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
      result(null, { ...city });
    }
  );
};

City.remove = (city, result) => {
  sql.query("DELETE FROM city WHERE cityName = ? AND country = ? AND square = ?", [city.cityName, city.country, city.square], (err, res) => {
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