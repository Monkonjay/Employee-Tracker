require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
});

connection.connect(err => {
    if(err) {
        throw err;
    }
    console.log('MySql connected successfully');
})

module.exports = connection;


