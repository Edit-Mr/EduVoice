require("dotenv").config();
const mariadb = require("mariadb");
const fs = require("fs");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
});
async function newUser(email, verified, passwordHash, userType=NULL, schoolId) {
    //新增一個新用戶
    let conn;
    try {
        conn = await pool.getConnection();

        // Using parameterized query to insert new user
        const query = `
            INSERT INTO Users (email, verified, password_hash, user_type, school_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [email, verified, passwordHash, userType, schoolId];

        const result = await conn.query(query, params);

        console.log("New user CREATE:", result.insertId);
    } catch (err) {
        console.error("Error inserting new user:", err);
    } finally {
        if (conn) conn.end();
    }
}
async function deleteUser(email,passwordHash) {
    //新增一個新用戶
    let conn;
    try {
        conn = await pool.getConnection();

        // Using parameterized query to insert new user
        const query = `
            INSERT INTO Users (email, verified, password_hash, user_type, school_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [email, verified, passwordHash, userType, schoolId];

        const result = await conn.query(query, params);

        console.log("user delete:", result.insertId);
    } catch (err) {
        console.error("Error delete old  user:", err);
    } finally {
        if (conn) conn.end();
    }
}
module.exports = { initializeDatabase };