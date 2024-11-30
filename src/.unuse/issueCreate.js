//新增一項規定議題，各校回報狀態
const pool = require("../package/sqlconn.js");

async function newIssue(title, tag, description, mandatory) {
  //新增一個新議題
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
        INSERT INTO rules (title, tag, content, is_mandatory)
        VALUES (?, ?, ?, ?)
        `;
    const params = [title, tag, description, mandatory];

    const result = await conn.query(query, params);

    console.log("New issue CREATE:", result.insertId);
  } catch (err) {
    console.error("Error inserting new issue:", err);
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { newIssue };
