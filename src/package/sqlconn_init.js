require("dotenv").config();
const mariadb = require("mariadb");

const init_pool=mariadb.createPool({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // dons't  ensure the database exist or not
    port: process.env.DB_PORT,
    connectionLimit: 5,
});  
module.exports = init_pool;