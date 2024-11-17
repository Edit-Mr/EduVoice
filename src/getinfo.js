const pool = require("./package/sqlconn.js");

async function getUserSchool(email) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      SELECT school FROM Users WHERE email = ?
    `;
    const params = [email];
    const rows = await conn.query(query, params);

    if (rows.length > 0) {
      return rows[0].school;
    } else {
      console.log("User not found or no school assigned");
      return null;
    }
  } catch (err) {
    console.error("Error retrieving user school:", err);
    return null;
  } finally {
    if (conn) conn.end();
  }
}

async function getRuleStatus(schoolId) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      SELECT * FROM rule_status WHERE school = ?
    `;
    const params = [schoolId];
    const rows = await conn.query(query, params);

    if (rows.length > 0) {
      return rows;
    } else {
      console.log("No rule status found for the given school");
      return [];
    }
  } catch (err) {
    console.error("Error retrieving rule status:", err);
    return [];
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { getUserSchool, getRuleStatus };
