const pool = require("../package/sqlconn.js");

async function editPost(title, content, author) {
  //編輯原有的文章
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
        UPDATE Announcements SET title = ?, content = ?, isupdate=1,updateAt= WHERE id = ?
        `;
    const params = [title, content, author];

    const result = await conn.query(query, params);

    console.log("Article edited:", result.insertId);
  } catch (err) {
    console.error("Error editing article:", err);
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { editPost };
