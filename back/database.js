const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
});

module.exports = pool;