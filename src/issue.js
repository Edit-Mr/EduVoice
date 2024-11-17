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
      `SELECT 
    rh.*, 
    s.name AS school_name
FROM 
    rule_history rh
JOIN (
    SELECT 
        school, 
        MAX(UNIX_TIMESTAMP(timeStamp) * 
            CASE status 
                WHEN 'O' THEN 3 
                WHEN '?' THEN 2 
                WHEN 'X' THEN 1 
            END) as max_score
    FROM 
        rule_history
    WHERE 
        rule = ?
    GROUP BY 
        school
) subquery ON rh.school = subquery.school AND 
    UNIX_TIMESTAMP(rh.timeStamp) * 
    CASE rh.status 
        WHEN 'O' THEN 3 
        WHEN '?' THEN 2 
        WHEN 'X' THEN 1 
    END = subquery.max_score
JOIN 
    schools s ON rh.school = s.id
WHERE 
    rh.rule = ?;
`,
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
      "SELECT COUNT(*) as icount FROM rule_history WHERE rule = ?;",
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
      "SELECT * FROM rules WHERE id = ?",
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
    // rules 表
    //     儲存規則的資訊。
    //     每條記錄有一個唯一的 id。

    // tags 表
    //     儲存標籤的資訊，如 "法規"、"校規" 等。
    //     每條記錄有一個唯一的 id 和對應的 name。

    // rule_tag 表
    //     這是一個關聯表，用於表示 rules 和 tags 之間的多對多關係。
    //     包含兩個外鍵：rule_id（指向 rules.id）和 tag_id（指向 tags.id）。
    //找到 rules 表中 ID 為 ruleId 所對應的所有標籤名稱（Tags.name）
    const result = await query(
      `SELECT tags.name FROM rules
      JOIN rule_tag ON rules.id = rule_tag.rule_id
      JOIN tags ON rule_tag.tag_id = tags.id
      WHERE rules.id = ?;
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

module.exports = { getRuleById, foucusIssue, informTime, getRuleTags };
