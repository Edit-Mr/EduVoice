/** @format */

const pool = require("./package/sqlconn_init.js");
const fs = require("fs");

RE_CREATE_ENABLE = false;
async function initializeDatabase() {
  let conn;
  try {
    conn = await pool.getConnection();
    // 查詢 INFORMATION_SCHEMA.TABLES 確認表是否存在
    const db_exist = await conn.query(`
      SELECT COUNT(*)
      FROM information_schema.SCHEMATA 
      WHERE schema_name = ?
    `, [process.env.DB_NAME]);
    //如果資料庫沒有被建立，或者RE_CREATE_ENABLE為true(開發人員手動調整)，則建立資料庫
    if (RE_CREATE_ENABLE || db_exist[0]['COUNT(*)']==0) { 
      await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
      await conn.query(`USE ${process.env.DB_NAME}`);

      // Read backup.sql file content
      //因為在測試階段，每次啟動重建結構，然後重新插入資料
      //mysqldump -u your_username -p --no-data --databases your_database_name > struct.sql
      const backupSql_struct = fs.readFileSync("./src/.tempbyIach/struct.sql", "utf8");
      const sqlCommands = backupSql_struct.split(";").map(cmd => cmd.trim()).filter(cmd => cmd);
      for (const sqlCmd of sqlCommands) {
        await conn.query(sqlCmd);
      }
      //mysqldump -u your_username -p --no-create-info --databases your_database_name > dataDump.sql
      const backupSql_data = fs.readFileSync("./src/.tempbyIach/dataDump.sql", "utf8");
      const sqlCommands_data = backupSql_data.split(";").map(cmd => cmd.trim()).filter(cmd => cmd);
      for (const sqlCmd of sqlCommands_data) {
        await conn.query(sqlCmd);
      }
      //完全備份
      //mysqldump -u your_username -p --databases your_database_name --add-drop-database --add-drop-table --lock-tables > full_backup.sql
    }
    console.log("ALL Table is  successfully create.");

  } catch (err) {
    console.error("Error during database initialization", err);
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { initializeDatabase };
