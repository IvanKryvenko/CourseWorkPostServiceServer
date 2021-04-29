module.exports = app => {
    const transports = require("../controllers/transport.controller.js");
  
    app.post("/transport", transports.create);
  
    app.get("/transport", transports.findAll);
  
    app.put("/transport/find", transports.findOne);
  
    app.put("/transport", transports.update);
  
    app.delete("/transport", transports.delete);
  };