module.exports = app => {
    const cities = require("../controllers/city.controller.js");
  
    app.post("/city", cities.create);
  
    app.get("/city", cities.findAll);
  
    app.get("/city/:cityName:country", cities.findOne);
  
    app.put("/city", cities.update);
  
    app.delete("/city/:cityName:country", cities.delete);
  
    app.delete("/city", cities.deleteAll);
  };