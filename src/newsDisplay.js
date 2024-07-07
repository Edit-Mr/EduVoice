require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

async function newsDisplay() {
    try {
        conn = await pool.getConnection();

        // Query to get the latest 3 announcements
        const query = `
            SELECT * FROM Announcements
            ORDER BY publishedAt DESC
            LIMIT 3
        `;
        const result = await conn.query(query);

        console.log("Latest Announcements:", result);
        return result;
    } catch (err) {
        console.error("Error fetching latest announcements:", err);
        return [];
    } finally {
        if (conn) conn.end();
    }

}
module.exports = { newsDisplay };
