/** @format */

const express = require("express");
const { initializeDatabase } = require("./database");//創建表格
const { login } = require('./auth'); // Import the login function from auth.js
//要插入被 forigkey 關聯的表格

const app = express();
const port = process.env.PORT || 3333;
app.use("/static",express.static('static'));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("首頁 - 顯示最新更新的文章以及規定");
});
app.post("/login", async (req, res) => {
    //登入頁，接收使用者輸入的帳號密碼
    const { email, pwd } = req.body; 

    if (!email || !pwd) {
        return res.status(400).json({ message: 'Missing email or password' });
    }
    try {
        const user = await login(email, pwd);
        console.log(user);
        if (user) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'+error });
    }

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