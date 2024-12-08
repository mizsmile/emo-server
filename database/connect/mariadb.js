const maria = require('mysql');

const conn = maria.createConnection({
    host : '127.0.0.1',
    port : 3306,
    user:'admin',
    password:'admin',
    database: 'emoDB'
});

module.exports = conn;