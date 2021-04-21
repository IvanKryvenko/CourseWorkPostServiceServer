module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    app.post("/employee", employees.create);
  
    app.get("/employee", employees.findAll);
  
    app.get("/employee/:phoneNumber", employees.findOne);
  
    app.put("/employee", employees.update);
  
    app.delete("/employee/:phoneNumber", employees.delete);
  
    app.delete("/employee", employees.deleteAll);
  };