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

async function getRuleTags(ruleId) {
  try {
    // Rules 表
    //     儲存規則的資訊。
    //     每條記錄有一個唯一的 id。

    // Tags 表
    //     儲存標籤的資訊，如 "法規"、"校規" 等。
    //     每條記錄有一個唯一的 id 和對應的 name。

    // Rule_tag 表
    //     這是一個關聯表，用於表示 Rules 和 Tags 之間的多對多關係。
    //     包含兩個外鍵：rule_id（指向 Rules.id）和 tag_id（指向 Tags.id）。
    //找到 Rules 表中 ID 為 ruleId 所對應的所有標籤名稱（Tags.name）
    const result = await query(
      `SELECT Tags.name FROM Rules
      JOIN Rule_tag ON Rules.id = Rule_tag.rule_id
      JOIN Tags ON Rule_tag.tag_id = Tags.id
      WHERE Rules.id = ?;
`,
      [ruleId],
      false
    );
    if (result) {
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error getRuleTags():", err);
    return null;
  }
}
module.exports = { getRuleById, foucusIssue, informTime ,getRuleTags};
