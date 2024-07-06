/** @format */

const express = require("express");
const { initializeDatabase } = require("./database");//創建表格

//要插入被 forigkey 關聯的表格

const app = express();
const port = process.env.PORT || 3333;
app.use("/static",express.static('static'));

app.get("/", (req, res) => {
    res.send("首頁 - 顯示最新更新的文章以及規定");
});

app.get("/s/:schoolName", (req, res) => {
    res.send(`學校資訊頁面 - ${req.params.schoolName}`);
});

app.get("/r/:ruleId", (req, res) => {
    res.send(`校規頁面 - 校規ID ${req.params.ruleId}`);
});

// Database initialization
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});