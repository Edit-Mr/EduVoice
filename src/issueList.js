// 給Rules.id ，過濾出所有符合的回報顯示在前端
const pool = require("./package/sqlconn.js");

/*  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule` int(11) DEFAULT NULL,
  `school` int(11) DEFAULT NULL,
  `change_description` text NOT NULL,
  `timeStamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`), */
async function listissue(ruleId) {
  try {
    conn = await pool.getConnection();
    const query = `
        SELECT * FROM Rule_History 
        `;
    const Result = await conn.query(query);
    if (Result.length > 0) {
      console.log(Result);
      return Result; // Return the result if found
    } else {
      console.log("No entries found in Rule_History");
      return [];
    }
  } catch (err) {
    console.error("Error issue list:", err);
    return [];
  } finally {
    if (conn) conn.end();
  }
}

async function listschool(ruleId) {
  try {
    conn = await pool.getConnection();
    const query = `
        SELECT school FROM Rule_History 
        `;
    const Result = await conn.query(query);
    if (Result.length > 0) {
      console.log(Result);
      return Result; // Return the result if found
    } else {
      console.log("No entries found in Rule_History");
      return [];
    }
  } catch (err) {
    console.error("Error issue list:", err);
    return [];
  } finally {
    if (conn) conn.end();
  }
}
module.exports = { listissue, listschool };
