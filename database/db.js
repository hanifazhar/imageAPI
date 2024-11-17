const mysql = require('mysql2');

const connection = {
    host: "localhost",
    user: "root",
    password: "",
    database: "images"
}

const db = mysql.createPool(connection);

module.exports = db;