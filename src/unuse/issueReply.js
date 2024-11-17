//大家根據自己的學校狀況回報狀態
const pool = require("../package/sqlconn.js");
/**Rule_History */
// `id` int(11) NOT NULL AUTO_INCREMENT,
// `rule` int(11) DEFAULT NULL, //事件 ID ，對應到 Roles.id
// `school` int(11) DEFAULT NULL, //學校代號
// `change_description` text NOT NULL,
// `changed_date` datetime NOT NULL,
async function issueReply(ruleId, school, change_description, changed_date) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
        INSERT INTO Rule_History (,school,change_description,changed_date) VALUES (?,?,?,?)
        `;
    const params = [ruleId, school, change_description, changed_date];
  } catch (err) {
    console.error("Error issue list:", err);
    return null;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { issueReply };
