module.exports = app => {
    const postings = require("../controllers/posting.controller.js");
  
    app.post("/posting", postings.create);
  
    app.get("/posting", postings.findAll);
  
    app.get("/posting/:deliveryNumber", postings.findOne);
  
    app.put("/posting", postings.update);
  
    app.delete("/posting/:deliveryNumber", postings.delete);
  
    app.delete("/posting", postings.deleteAll);
  };