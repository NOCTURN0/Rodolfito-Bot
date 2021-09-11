const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./db/dashboard.sqlite3');

module.exports = database;