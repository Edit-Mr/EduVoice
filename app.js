const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = process.env.PORT || 3000;

// Configure MariaDB connection pool
const pool = mariadb.createPool({
    host: 'your_host', 
    user: 'your_user', 
    password: 'your_password',
    database: 'your_database'
});

// Simple route to check database connectivity
app.get('/db', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        res.json(rows);
        conn.end();
    } catch (err) {
        res.status(500).send(`Error in DB operation: ${err}`);
    }
});

// Define a route for the root of your app
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
