module.exports = app => {
    const custom = require("../controllers/custom.controller.js");
  
    app.put("/custom/find", custom.findOne);
  };