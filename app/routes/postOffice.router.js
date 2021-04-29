module.exports = app => {
    const offices = require("../controllers/postOffice.controller.js");
  
    app.post("/office", offices.create);
  
    app.get("/office", offices.findAll);
  
    app.put("/office/find", offices.findOne);
  
    app.put("/office", offices.update);
  
    app.delete("/office", offices.delete);
  };