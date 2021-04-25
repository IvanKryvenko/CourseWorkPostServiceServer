const sql = require("./index.js");

// constructor
const Employee = function(employee) {
  this.employeeName = employee.employeeName;
  this.birthDate = employee.birthDate;
  this.workExperience = employee.workExperience;
  this.employeePosition = employee.employeePosition;
  this.phoneNumber = employee.phoneNumber;
  this.postOffice = employee.postOffice;
  this.workStartDate = employee.workStartDate;
  this.salary = employee.salary;
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", {  ...newEmployee });
    result(null, { ...newEmployee });
  });
};

Employee.findBySalaryAndStartDate = (salary, workStartDate, result) => {
  sql.query(`SELECT * FROM employee WHERE salary = ${salary} AND workStartDate = ${workStartDate}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee: ", res);
    result(null, res);
  });
};

Employee.updateByPhone = (employee, result) => {
  sql.query(
    "UPDATE employee SET employeeName = ?, birthName = ?, workExperience = ?, employeePosition = ?,  postOffice = ?, workStartDate = ?, salary = ? WHERE phoneNumber = ?",
    [employee.employeeName, employee.birthDate, employee.workExperience, employee.employeePosition, employee.postOffice, employee.workStartDate, employee.salary, employee.phoneNumber],
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

      console.log("updated employee: ", { ...employee });
      result(null, { ...employee });
    }
  );
};

Employee.remove = (employee, result) => {
  sql.query("DELETE FROM employee WHERE phoneNumber = ?", employee.phoneNumber, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee", employee.employeeName);
    result(null, res);
  });
};


module.exports = Employee;