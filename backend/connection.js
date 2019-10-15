const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'seafoody'
});

connection.connect(err => {
    if(err) console.log(err.stack);
    console.log('Connected as ' + connection.threadId);
})

module.exports = connection;