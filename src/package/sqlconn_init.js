require("dotenv").config();
const mariadb = require("mariadb");

const init_pool=mariadb.createPool({
    DB_HOST: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // dons't  ensure the database exist or not
    connectionLimit: 5,
});  
module.exports = init_pool;