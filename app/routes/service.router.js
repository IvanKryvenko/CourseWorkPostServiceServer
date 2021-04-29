module.exports = app => {
    const services = require("../controllers/service.controller.js");
  
    app.post("/service", services.create);
  
    app.get("/service", services.findAll);
  
    app.put("/service/find", services.findOne);
  
    app.put("/service", services.update);
  
    app.delete("/service", services.delete);
  };