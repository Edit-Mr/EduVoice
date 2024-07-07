require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

async function login(email, passwordHash) {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `
        SELECT * FROM Users WHERE email = ? AND password_hash = ?
        `;
        const params = [email, passwordHash];

        const rows = await conn.query(query, params);

        console.log("User login:", rows);
        if (rows.length > 0) {
            return rows[0]; // Return user details if needed
        } else {
            console.log("User login failed: Invalid email or password");
            return null;
        }
    } catch (err) {
        console.error("Error login user:", err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = { login };
