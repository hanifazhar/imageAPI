const mysql = require('mysql2');

const connection = {
    host: "localhost",
    user: "root",
    password: "",
    database: "images"
}

const db = mysql.createPool(connection);
db.getConnection((err) => {
    if (err) throw err
    console.log('DB Connected')
})

module.exports = db;