// 給Rules.id ，過濾出所有符合的回報顯示在前端
const { query } = require("./sqlSearch.js");
/*  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule` int(11) DEFAULT NULL,
  `school` int(11) DEFAULT NULL,
  `change_description` text NOT NULL,
  `timeStamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`), */
async function foucusIssue(ruleId) {
  //取得某議題所有學校最新回報
  try {
    const Result = await query(
      `SELECT rh.*, s.name AS school_name \
FROM Rule_History rh \
JOIN ( \
    SELECT school, MAX(timeStamp) AS latest_timeStamp \
    FROM Rule_History \
    WHERE rule = ? \
    GROUP BY school \
) subquery ON rh.school = subquery.school AND rh.timeStamp = subquery.latest_timeStamp \
JOIN Schools s ON rh.school = s.id \
WHERE rh.rule = ?;`,
      [ruleId, ruleId]
    );
    if (Result.length > 0) {
      return Result; // Return the result if found
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error foucusIssue():", err);
    return [];
  }
}
async function informTime(ruleId) {
  try {
    const Result = await query(
      "SELECT COUNT(*) as icount FROM Rule_History WHERE rule = ?;",
      [ruleId],
      true
    );
    if (Result) {
      return Number(Result.icount);
    } else {
      return 0;
    }
  } catch (err) {
    console.error("Error informTime():", err);
    return 0;
  }
}
async function getRuleById(ruleId) {
  try {
    const result = await query(
      "SELECT * FROM Rules WHERE id = ?",
      [ruleId],
      true
    );
    if (result) {
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error getRule():", err);
    return null;
  }
}
module.exports = { getRuleById, foucusIssue, informTime };
