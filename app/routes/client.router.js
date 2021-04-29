module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    app.post("/client", clients.create);
  
    app.get("/client", clients.findAll);
  
    app.put("/client/find", clients.findOne);
  
    app.put("/client", clients.update);
  
    app.delete("/client", clients.delete);

  };