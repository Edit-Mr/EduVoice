require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});
const { randomString } = require("./package/randString.js"); //新增用戶
async function newUser(email, verified, passwordHash, userType=NULL, schoolId,backupMail=NULL) {
    //新增一個新用戶
    let conn;
    try {
        conn = await pool.getConnection();

        const TOKEN = randomString();
        const query = `
            INSERT INTO Users (email, verified, password_hash, user_type, school,token)
            VALUES (?, ?, ?, ?, ?,?)
        `;
        const params = [email, verified, passwordHash, userType, schoolId,TOKEN];

        const result = await conn.query(query, params);

        console.log("New user CREATE:", result.insertId);
    } catch (err) {
        console.error("Error inserting new user:", err);
    } finally {
        if (conn) conn.end();
    }
}
module.exports = { newUser };


