// 給Rules.id ，過濾出所有符合的回報顯示在前端
require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

/*  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule` int(11) DEFAULT NULL,
  `school` int(11) DEFAULT NULL,
  `change_description` text NOT NULL,
  `timeStamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`), */
async function issueDisplay(ruleId)
{
    try {
        conn = await pool.getConnection();
        const query = `
        SELECT * FROM Rule_History WHERE rule = ?
        `
        const params = [ruleId];
        const Result = await conn.query(query, params);
        if (Result.length > 0) {
            return Result; // Return the result if found
        } else {
            console.log("No entries found in Rule_History");
            return [];
        }
    }
    catch (err) {
        console.error("Error issue list:", err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}

module.exports = { issueDisplay};