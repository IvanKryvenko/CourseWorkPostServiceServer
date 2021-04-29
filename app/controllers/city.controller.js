const City = require("../models/city.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const city = new City({
    cityName: req.body.cityName,
    country: req.body.country,
    square: req.body.square,
    infrastructureLevel: req.body.infrastructureLevel,
    popularity: req.body.popularity,
    postOfficesCount: req.body.postOfficesCount
  });

  City.create(city, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the city."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  City.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cities."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  City.findByPopularityAndPostOfficesCount(req.body.popularity, req.body.postOfficesCount,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found city with popularity ${req.body.popularity}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving city with popularity " + req.body.popularity
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  City.updateByCountryAndCityName(
    new City(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found city delivery with name ${req.body.cityName}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating city with name " + req.body.cityName
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  City.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found city with name ${req.body.cityName}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete city with name " + req.body.cityName
        });
      }
    } else res.send({ message: `city was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  City.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cities."
      });
    else res.send({ message: `All cities were deleted successfully!` });
  });
};