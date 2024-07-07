require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

async function statusIssue(schoolId, issueId) {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `
            SELECT * FROM Rule_Status
            WHERE school = ? AND rule = ?
        `;
        const params = [schoolId, issueId];
        const result = await conn.query(query, params);
        
        if (result.length > 0) {
            return result[0]; // Assuming you only need one result
        } else {
            console.log("No status found for the given school and issue");
            return null;
        }
    } catch (err) {
        console.error("Error fetching status:", err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {  statusIssue };
