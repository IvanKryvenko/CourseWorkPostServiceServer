module.exports = app => {
    const offices = require("../controllers/postOffice.controller.js");
  
    app.post("/office", offices.create);
  
    app.get("/office", offices.findAll);
  
    app.get("/office/:officeNumber:city", offices.findOne);
  
    app.put("/office", offices.update);
  
    app.delete("/office/:officeNumber:city", offices.delete);
  
    app.delete("/office", offices.deleteAll);
  };