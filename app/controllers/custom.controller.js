const Custom = require("../models/custom.model.js");

exports.findOne = (req, res) => {
    Custom.findByEmployeeAndOffice(req.body.employee, req.body.office,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.employee}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.office
        });
      }
    } else res.send(data);
  });
};

