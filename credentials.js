var mysql = require('mysql');

// set the mysql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'quotes'
});

// EXPORTS
module.exports = connection;