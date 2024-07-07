require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});
async function deleteUser(email, verified, passwordHash, userType=NULL, schoolId,backupMail=NULL) {
    //刪除用戶
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `
        SELECT * FROM Users WHERE email = ? AND password_hash = ?
        `;
        const params = [email, passwordHash];

        const  varify = await conn.query(query, params);

        if ( varify.length > 0) {
            const deleteq=`
            DELETE FROM Users WHERE email = ? AND password_hash = ?
            `;
            const deletep = [email, passwordHash];
            const result = await conn.query(deleteq, deletep);
            console.log("User delete:", result);   
            return { success: true, message: 'User deleted successfully', affectedRows: result.affectedRows };
        } else {
            console.log("Invalid email or password");
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (err) {
        console.error("Error deleting user:", err);
        return { success: false, message: 'Internal server error', error: err };
    } finally {
        if (conn) conn.end();
    }
}
module.exports = { deleteUser };


