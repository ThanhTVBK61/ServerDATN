var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"datn_2020"
});

module.exports = connection;