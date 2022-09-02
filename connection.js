const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password: 'password'
});

connection.connect(err => {
    if(err) {
        throw err;
    }
})

module.exports = connection;


