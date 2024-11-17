const pool = require("./package/sqlconn.js");
const { randomString } = require("./package/randString.js"); //新增用戶
async function newUser(nickname,email, passwordHash, schoolId, token,schoolEmail=null) {
  //新增一個新用戶
  let conn;
  try {
    conn = await pool.getConnection();

    const TOKEN = randomString();
    const query = `
            INSERT INTO users (nickname,email, password_hash, school,token,backupMail)
            VALUES (?,?, ?, ?, ?,?)
        `;
    const params = [nickname,email, passwordHash, schoolId, token,schoolEmail];

    const result = await conn.query(query, params);
    return true;
  } catch (err) {
    console.error("Error inserting new user:", err);
    return false;
  } finally {
    if (conn) conn.end();
  }
}
module.exports = { newUser };
