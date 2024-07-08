const pool = require("./package/sqlconn.js");

//(sql傳入語句, params傳入參數, onresult是否只回傳一個row的結果)
async function query(sql, params, onresult = false) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(sql, params);
    if (onresult) return res[0];
    else return res;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}
module.exports = { query };
