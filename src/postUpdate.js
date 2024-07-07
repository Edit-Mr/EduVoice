require("dotenv").config();
const mariadb = require("mariadb");
const fs = require("fs");
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
});

async function editPost(title, content, author){
    //編輯原有的文章
    let conn;                   
    try {
        conn = await pool.getConnection();
        const query = `
        UPDATE Announcements SET title = ?, content = ?, isupdate=1,updateAt= WHERE id = ?
        `;
        const params = [title, content, author];

        const result = await conn.query(query, params);

        console.log("Article edited:", result.insertId);
    } catch (err) {
        console.error("Error editing article:", err);
    } finally {
        if (conn) conn.end();
    }
}



module.exports = { editPost };