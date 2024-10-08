//檢查帳號是否存在
require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});
async function isExist(email,backupMail=null)
{
    let conn;
    try {
        conn = await pool.getConnection();
        const query1 = `
        SELECT * FROM Users WHERE email = ?
        `;
        const params = [email];
        const rows = await conn.query(query1, params);

        if(backupMail!=null){
            const query2 = `
            SELECT * FROM Users WHERE email = ?
            `;
            const params = [backupMail];
            const rows2 = await conn.query(query2, params);
            
        }
        if (rows.length > 0 || rows2.length > 0) {
            return rows[0]; // already exist
        } else {
            return false; // not exist
        }
    } catch (err) {
        console.error("Error check user exist:", err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = { isExist };
