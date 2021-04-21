module.exports = app => {
    const transports = require("../controllers/transport.controller.js");
  
    app.post("/transport", transports.create);
  
    app.get("/transport", transports.findAll);
  
    app.get("/transport/:licensePlateNumber", transports.findOne);
  
    app.put("/transport", transports.update);
  
    app.delete("/transport/:licensePlateNumber", transports.delete);
  
    app.delete("/transport", transports.deleteAll);
  };