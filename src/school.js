const { query } = require("./sqlSearch.js");
async function getAllRuleStatusInschool(schoolId) {
  try {
    const Result = await query(
      `SELECT 
          r.id, 
          r.title, 
          LEFT(r.content, 10) as content, 
          r.is_mandatory,
          rh.change_description, 
          rh.timeStamp, 
          rh.status
      FROM 
          Rules r
      JOIN 
          Rule_History rh ON r.id = rh.rule
      JOIN (
          SELECT 
              rule, 
              MAX(UNIX_TIMESTAMP(timeStamp) * 
                  CASE status 
                      WHEN 'O' THEN 3 
                      WHEN '?' THEN 2 
                      WHEN 'X' THEN 1 
                  END) as max_score
          FROM 
              Rule_History
          WHERE 
              school = ?
          GROUP BY 
              rule
      ) as max_scores ON rh.rule = max_scores.rule AND 
          UNIX_TIMESTAMP(rh.timeStamp) * 
          CASE rh.status 
              WHEN 'O' THEN 3 
              WHEN '?' THEN 2 
              WHEN 'X' THEN 1 
          END = max_scores.max_score;
      `,
      //把status定為OX?的依據是一個分數，讓日期較舊的有比較少的權重，結算最後分數區間，每一筆的狀態 O?X 分數要遞減，乘上日期權重後看掉在哪個區間決定是什麼狀態
      [schoolId]
    );
    
    return Result;
  } catch (err) {
    console.error("Error getAllRuleStatusInschool():", err);
    return [];
  }
}

module.exports = { getAllRuleStatusInschool };
