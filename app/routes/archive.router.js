module.exports = app => {
    const archives = require("../controllers/archive.controller.js");
  
    app.post("/archive", archives.create);
  
    app.get("/archive", archives.findAll);
  
    app.get("/archive/:archiveId", archives.findOne);
  
    app.put("/archive/:archiveId", archives.update);
  
    app.delete("/archive/:archiveId", archives.delete);
  
    app.delete("/archive", archives.deleteAll);
  };