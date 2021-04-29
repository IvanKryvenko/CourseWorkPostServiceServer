module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    app.post("/employee", employees.create);
  
    app.get("/employee", employees.findAll);
  
    app.put("/employee/find", employees.findOne);
  
    app.put("/employee", employees.update);
  
    app.delete("/employee", employees.delete);
  };