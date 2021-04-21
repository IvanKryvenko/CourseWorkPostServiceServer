module.exports = app => {
    const services = require("../controllers/service.controller.js");
  
    app.post("/service", services.create);
  
    app.get("/service", services.findAll);
  
    app.get("/service/:serviceName:serviceCustomer", services.findOne);
  
    app.put("/service", services.update);
  
    app.delete("/service/:serviceName:serviceCustomer", services.delete);
  
    app.delete("/service", services.deleteAll);
  };