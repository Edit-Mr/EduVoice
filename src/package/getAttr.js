require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function getone(table, properties, value) {
  try {
    conn = await pool.getConnection();
    const query = `
            SELECT * FROM ${table}
            WHERE ${properties} = ?
        `;
    const params = [value];
    const rows = await conn.query(query, params);
    if (rows.length > 0) {
      return rows[0]; // Return user details if needed
    } else {
      console.log(`not found property or value in table:${properties} ${value} form ${table}`);
      return null;
    }
  } catch (err) {
    console.error("Error login user:", err);
    return null;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { getone };
