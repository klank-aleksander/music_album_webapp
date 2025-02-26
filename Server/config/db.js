const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'my_user',
    password: 'password',
    database: 'vinyl_db',
});


module.exports = db;