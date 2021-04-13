const dbConfig = require("../config/db.config.js");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(err => {
  if (err) throw err;
  console.log('Succesfully connected to db');
});

module.exports = connection;