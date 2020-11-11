let mysql = require('mysql');
let config = require('./config.json');
let db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(config);
        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();