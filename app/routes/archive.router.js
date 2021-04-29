module.exports = app => {
    const archives = require("../controllers/archive.controller.js");
  
    app.post("/archive", archives.create);
  
    app.get("/archive", archives.findAll);
  
    app.put("/archive/find", archives.findOne);
  
    app.put("/archive/:archiveId", archives.update);
  
    app.delete("/archive", archives.delete);
  };