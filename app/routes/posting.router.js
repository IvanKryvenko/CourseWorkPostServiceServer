module.exports = app => {
    const postings = require("../controllers/posting.controller.js");
  
    app.post("/posting", postings.create);
  
    app.get("/posting", postings.findAll);
  
    app.put("/posting/find", postings.findOne);
  
    app.put("/posting", postings.update);
  
    app.delete("/posting", postings.delete);
  };