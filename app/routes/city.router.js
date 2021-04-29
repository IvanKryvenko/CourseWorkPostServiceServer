module.exports = app => {
    const cities = require("../controllers/city.controller.js");
  
    app.post("/city", cities.create);
  
    app.get("/city", cities.findAll);
  
    app.put("/city/find", cities.findOne);
  
    app.put("/city", cities.update);
  
    app.delete("/city", cities.delete);
  };