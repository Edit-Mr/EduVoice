require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});
// CREATE TABLE Announcements (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(25) NOT NULL,
//      author VARCHAR(25) NOT NULL,
//     content VARCHAR(5000) NOT NULL,
//     publishedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     isupdate TINYINT(1) NOT NULL DEFAULT 0,
//     updatedAt DATETIME DEFAULT NULL
// );
async function newAnnouncement(title, content, author){
    //新增一個新公告
    let conn;
    try {
        conn = await pool.getConnection();

        // Using parameterized query to insert new user
        const query = `
            INSERT INTO Announcements (title, content, author)
            VALUES (?, ?, ?)
        `;
        const params = [title, content, author];

        const result = await conn.query(query, params);

        console.log("New Announcement CREATE:", result.insertId);
    } catch (err) {
        console.error("Error inserting new Announcement:", err);
    } finally {
        if (conn) conn.end();
    }
}

module.exports = { newAnnouncement };