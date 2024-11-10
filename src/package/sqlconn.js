require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5,
});
console.log("db env",process.env.DB_HOST,process.env.DB_USER,
    process.env.DB_PASSWORD,process.env.DB_NAME,process.env.DB_PORT);
module.exports = pool;
