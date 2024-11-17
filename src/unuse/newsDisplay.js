const pool = require("../package/sqlconn.js");

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
