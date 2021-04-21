module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    app.post("/client", clients.create);
  
    app.get("/client", clients.findAll);
  
    app.get("/client/:email", clients.findOne);
  
    app.put("/client", clients.update);
  
    app.delete("/client/:email", clients.delete);
  
    app.delete("/client", clients.deleteAll);
  };