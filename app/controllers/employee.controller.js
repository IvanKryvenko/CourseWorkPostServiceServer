const Employee = require("../models/employee.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const employee = new Employee({
    employeeName: req.body.employeeName,
    birthDate: req.body.birthDate,
    workExperience: req.body.workExperience,
    employeePosition: req.body.employeePosition,
    phoneNumber: req.body.phoneNumber,
    postOffice: req.body.postOffice,
    workStartDate: req.body.workStartDate,
    salary: req.body.salary
  });

  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Employee.findBySalaryAndStartDate(req.body.salary, req.body.workStartDate,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.workStartDate}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.body.workStartDate
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Employee.updateByPhone(
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${req.body.phoneNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating " + req.body.phoneNumber
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Employee.remove(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ${req.body.phoneNumber}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete " + req.body.phoneNumber
        });
      }
    } else res.send({ message: `employee was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    else res.send({ message: `All employees were deleted successfully!` });
  });
};