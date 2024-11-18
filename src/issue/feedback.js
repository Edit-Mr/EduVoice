const pool = require("../package/sqlconn.js");
async function newFeedback(ruleid,user_school,change_description,status) {
  //新增一個新回饋
  let conn;
  try {
    conn = await pool.getConnection();

    // Using parameterized query to insert new user
    const query = `
            INSERT INTO rule_history (rule,school,change_description,status) 
            VALUES (?, ?, ?, ?)
        `;
    const params = [ruleid,user_school,change_description,status];

    const result = await conn.query(query, params);

    console.log("src/issue/ffeedback.kks:New Feedback CREATE:", result.insertId);
  } catch (err) {
    console.error("Error inserting new Feedback:", err);
    return false
  } finally {
    if (conn) conn.end();
    return true
  }
}   

module.exports = { newFeedback };
