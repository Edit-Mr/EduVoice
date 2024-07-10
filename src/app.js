/** @format */
const request = require("request");
const express = require("express");
const path = require("path");
const { initializeDatabase } = require("./database"); //創建表格
const { newAnnouncement } = require("./newsCreate.js"); //新增公告
const { newUser } = require("./regester"); //新增用戶
const { query } = require("./sqlSearch.js");
//要插入被 forigkey 關聯的表格
const pool = require("./package/sqlconn.js");
const app = express();
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;
const port = process.env.PORT || 3333;
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.json());

// Set the view engine to EJS in folder ./views
app.set("view engine", "ejs");
app.set("views", "./src/views/");

app.get("/", (req, res) => {
  res.render("index", { loginStatus: true });
});

// 登入
const { login } = require("./auth");
const { randomString } = require("./package/randString.js"); //產生隨機字串 token

app.get("/oauth", (req, res) => {
  res.render("oauth", { loginStatus: true });
});

app.get("/login", (req, res) => {
  res.render("login", { loginStatus: true });
});

app.post("/login", async (req, res) => {
  console.log("login:");
  //登入頁，接收使用者輸入的帳號密碼
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).render("login", {
      loginStatus: false,
      email,
      message: "未輸入帳號或密碼",
    });
  }
  try {
    const user = await login(email, pwd);
    if (user) {
      // Generate a session token or other identifier
      const token = randomString();

      // Set cookie with token
      res.cookie("auth_token", token, { httpOnly: true, secure: true });

      // Redirect back to home page
      res.render("index", { loginStatus: true });
    } else {
      res.status(401).render("login", {
        loginStatus: false,
        email,
        message: "帳號或密碼錯誤",
      });
    }
  } catch (error) {
    res.status(500).render("login", {
      loginStatus: false,
      email,
      message: "伺服器錯誤",
    });
  }
});
const { isExist } = require("./account.js");
const { getUserSchool, getRuleStatus } = require("./getinfo");
app.get("/getinfo", async (req, res) => {
  //select school form Users where email = ?
  //拿 school id 去對應把該校的 Rule_Status每個欄位傳回來，有可能是空的，這時候就顯示未登錄
  const email = req.query.email; // Assuming email is passed as a query parameter
  try {
    const schoolId = await getUserSchool(email);

    if (!schoolId) {
      return res.render("info", { status: "未登錄", rules: [] });
    }

    const ruleStatus = await getRuleStatus(schoolId);

    if (ruleStatus.length === 0) {
      return res.render("info", { status: "未登錄", rules: [] });
    }

    return res.render("info", { status: "已登錄", rules: ruleStatus });
  } catch (error) {
    console.error("Error in /getinfo route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});

//登出
app.get("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("/");
});
const { deleteUser } = require("./userDelete.js"); //刪除用戶
app.post("/deleteUser", async (req, res) => {
  const { email, passwordHash } = req.body;

  if (!email || !passwordHash) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const result = await deleteUser(email, passwordHash);
    if (result.success) {
      return res.json({
        message: result.message,
        affectedRows: result.affectedRows,
      });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in /deleteUser route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});
// app read traditional <form> data
app.use(express.urlencoded({ extended: true }));

app.post("/oauth", async (req, res) => {
  const { email } = req.body;
  return res.render("register", {
    loginStatus: false,
    email,
    message: "",
  });
});

// 註冊
app.post("/register", async (req, res) => {
  //INSERT INTO Users (email, verified, password_hash, user_type, school,token)VALUES (?, ?, ?, ?, ?,?)
  //新增一個新用戶
  const { email, pwd, userType, schoolId } = req.body;
  if (!email || !pwd || !userType || !schoolId) {
    return res.status(400).render("register", {
      loginStatus: false,
      message: "有空格未完成填寫",
    });
  }
  //檢查帳號是否已經存在
  if (isExist(email)) {
    return res.status(400).render("register", {
      loginStatus: false,
      message: "信箱已經被註冊過",
    });
  }
  try {
    const user = await newUser(email, false, pwd, userType, schoolId);
    return res.render("signupResult", {
      result: "註冊成功",
      message: "請至電子郵件點擊確認信來寄送電子郵件。",
    });
  } catch (error) {
    res.status(500).render("register", {
      loginStatus: false,
      message: "伺服器錯誤",
    });
  }
});

//新增公告
app.post("/newAnnouncement", async (req, res) => {
  //新增一個新公告
  const { title, author, content } = req.body;
  if (!title || !author || !content) {
    return res
      .status(400)
      .json({ loginStatus: false, message: "Missing required fields" });
  }
  try {
    const announcement = await newAnnouncement(title, author, content);
    res.json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});

const { getone } = require("./package/getAttr.js"); // Assuming this function is properly defined

app.get("/s/:school/", async (req, res) => {
  schoolId = req.params.school;
  //schoolData.[sql欄位名稱]可以取得該校的資料
  try {
    schoolData = await query(
      "SELECT * FROM Schools WHERE id = ?",
      [schoolId],
      true
    );
    if (!schoolData) {
      return res.status(404).render("signupResult", {
        result: "找不到學校",
        message: "找不到這間學校",
        loginStatus: false,
      });
    }
    //ruleRule是該校的所有規定(含該校規定狀態、規定細目)
    const ruleData = await query(
      "SELECT Rules.id, Rules.title, LEFT(Rules.content,10) as content, \
      Rules.is_mandatory,Rule_History.change_description, Rule_History.timeStamp, Rule_History.status \
      FROM Rules JOIN Rule_History ON Rules.id = Rule_History.rule WHERE Rule_History.school = ?;",
      [schoolId]
    );
    return res.render("school", {
      ruleData,
      schoolData,
      loginStatus: false,
    });
  } catch (error) {
    console.error("Error in /s/:school/ route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});

app.get("/rules", async (req, res) => {
  return res.render("issue", {
    loginStatus: false,
  });
});


const { getRuleById,foucusIssue } = require("./issue.js");
app.get("/i/:ruleId", async (req, res) => {
  const ruleId = req.params.ruleId;
  try {
    const ruleDetail = await getRuleById(ruleId);
    const ruleStatus = await foucusIssue(ruleId);
    console.log("igewopghw[eoj[o]]:", ruleDetail);
    console.log("all:", ruleStatus);
    console.log(ruleDetail.length,ruleStatus.length)
    if ((ruleDetail.length==0 || ruleStatus.length==0)) {
      return res.status(404).render("signupResult", {
        result: "喔哦",
        message: "找不到這個規定",
        loginStatus: false,
      });
    }

    return res.render("issue", {
      ruleDetail,
      ruleStatus,
      loginStatus: false
    });
  } catch (error) {
    console.error("Error in /i/:ruleId route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});

//搜尋符合關鍵字的學校或校規
const { search } = require("./search");
app.get("/search", async (req, res) => {
  const q = req.query.q;
  results = await search(q);
  const schools = results.schools || [];
  const rules = results.rules || [];
  // console.log("search result:", { schools, rules });
  return res.render("search", {
    q,
    schools,
    rules,
    loginStatus: false,
  });
});

//新的議題
const { newIssue } = require("./issueCreate.js");
app.post("/newissue", async (req, res) => {
  const { title, tag, description, mandatory } = req.body;

  if (!title || !tag || !description || mandatory === undefined) {
    return res
      .status(400)
      .json({ message: "Missing title, tag, description, or mandatory" });
  }

  try {
    await newIssue(title, tag, description, mandatory);
    return res.status(201).json({ message: "New issue created successfully" });
  } catch (error) {
    console.error("Error in /newissue route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus: false,
    });
  }
});

app.post("/line-webhook", (req, res) => {
  // Handle messages
  const events = req.body.events;
  events.forEach((event) => {
    if (
      event.type === "message" &&
      event.message.text.toLowerCase() === "電子報範例"
    ) {
      sendFlexMessage(event.replyToken);
    }
  });
  res.sendStatus(200);
});

function sendFlexMessage(replyToken) {
  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "學聲 每日電子報",
        contents: require("./views/flex/news.json"),
      },
    ],
  };

  request(
    {
      method: "POST",
      url: "https://api.line.me/v2/bot/message/reply",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    },
    (error, response, body) => {
      if (error) {
        console.error("Error sending message: ", error);
      } else {
        console.log("Message sent: ", body);
      }
    }
  );
}

// Database initialization
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
