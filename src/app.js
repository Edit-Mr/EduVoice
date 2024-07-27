/** @format */
const request = require("request");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { initializeDatabase } = require("./database"); //創建表格
const { newAnnouncement } = require("./newsCreate.js"); //新增公告
const { newUser } = require("./regester"); //新增用戶
const { query } = require("./sqlSearch.js");
const setCookie = require("./package/cookie.js");
//要插入被 forigkey 關聯的表格
const pool = require("./package/sqlconn.js");
const app = express();
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;
const port = process.env.PORT || 3333;
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(cookieParser());
// Set the view engine to EJS in folder ./views
app.set("view engine", "ejs");
app.set("views", "./src/views/");
// app read traditional <form> data
app.use(express.urlencoded({ extended: true }));
const { randomString } = require("./package/randString.js"); //產生隨機字串 token

app.get("/", (req, res) => {
  // 根據 cookie 有沒有登入資料決定要不要顯示登入按鈕
  console.log("get-index");
  const loginStatus = req.cookies.userInfo ? true : false;
  res.render("index", { loginStatus });
});

app.get("/oauth", (req, res) => {
  console.log("get-oauth");
  loginStatus = req.cookies.userInfo ? true : false;
  res.render("oauth", { loginStatus });
});

app.get("/login", (req, res) => {
  console.log("get-login");
  loginStatus = req.cookies.userInfo ? true : false;
  res.render("login", { loginStatus });
});

app.post("/login", async (req, res) => {
  console.log("post-login:", req.body);
  //登入頁，接收使用者輸入的帳號密碼
  const { email, password } = req.body;
  console.log("送一個 post{", email, password);
  if (!email || !password) {
    return res.status(400).render("login", {
      loginStatus: false,
      email,
      message: "未輸入帳號或密碼",
    });
  }
  try {
    const  user =await query(
      "SELECT * FROM Users WHERE email = ? and password_hash = ?",
      [email, password],
      true
    );
    console.log("user:",(user)?true:false);
    if (user) {
      // Redirect back to home page
      console.log("登入成功");
      const name=user.name,schoolId=user.school,school=await query("SELECT name FROM Schools WHERE id = ?",[schoolId],true).name;
      try
      {
        setCookie(res, "userInfo", { email, name, schoolId, school });
      }
      catch (e)
      {
        console.log("Error in setCookie", e);
      }
      // return res.render("index", { loginStatus: true });//為什麼會去login.ejs?
      console.log("準備彈跳");
      return res.render("index", { loginStatus: true });

      // return res.redirect("/");
    } else {
      console.log("登入失敗，重新登入");
      return res.status(401).render("login", {
        loginStatus: false,
        email,
        message: "帳號或密碼錯誤",
      });
    }
  } catch (error) {
    res.status(500).render("login", {
      loginStatus: false,
      email,
      message: "伺服器錯誤，聯絡管理員，稍後再試",
    });
  }
});

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
  res.clearCookie("userInfo");
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

app.post("/oauth", async (req, res) => {
  console.log("post-oauth");
  loginStatus = req.cookies.userInfo ? true : false;
  const { email } = req.body;
  //撈一下資料，看看要跳登入頁面或是註冊頁面
  vip = await query("SELECT * FROM Users WHERE email = ?", [email], true);
  if (vip) {
    return res.render("login", {
      loginStatus,
      email,
      message: "親愛的用戶你好，請輸入密碼",
    });
  } else {
    return res.render("register", {
      loginStatus,
      email,
      message: "",
    });
  }
});

// 註冊
app.post("/register", async (req, res) => {
  //INSERT INTO Users (email, verified, password_hash, user_type, school,token)VALUES (?, ?, ?, ?, ?,?)
  //新增一個新用戶
  console.log(req.body);
  const { email, schoolEmail, name, password, confirmPassword, school } =
    req.body;
  console.log(email, schoolEmail, name, password, school);
  if (!email || !name || !password || !school) {
    return res.status(400).render("register", {
      loginStatus: false,
      email,
      message: "有空格未完成填寫",
    });
  }
  // 後端也會檢查一次密碼是否一致
  if (password !== confirmPassword) {
    return res.status(400).render("register", {
      loginStatus: false,
      email,
      name,
      message: "密碼不一致",
    });
  }
  //檢查帳號是否已經存在
  query("SELECT * FROM Users WHERE email = ?", [email], true).then((rows) => {
    //undefined 表示和資料庫已存在帳號不重複
    if (rows) {
      return res.status(400).render("register", {
        loginStatus: false,
        email,
        message: "信箱已經被註冊過",
      });
    }
  });
  try {
    var schoolId = await query(
      "SELECT id FROM Schools WHERE name = ?",
      [school],
      true
    );
    if (!schoolId) {
      return res.status(400).render("register", {
        loginStatus: false,
        email,
        message: "學校不存在<br>你的學校不在裡面嗎？請聯絡我們。",
      });
    }
    schoolId = schoolId.id;

    createdFlag = await newUser(
      email,
      password,
      schoolId,
      randomString(5),
      schoolEmail
    );
    if (createdFlag) {
      console.log("註冊成功");
      setCookie(res, "userInfo", { email, name, schoolId, school });
      return res.render("signupResult", {
        loginStatus: true,
        result: "註冊成功",
        message: "請至電子郵件點擊確認信來寄送電子郵件。",
      });
    }
    throw new Error("/register 註冊過程中出現未預期的錯誤");
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).render("signupResult", {
      loginStatus: false,
      result: "哦哦",
      message: "伺服器似乎出現了點問題...",
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

const { getRuleById, foucusIssue, informTime } = require("./issue.js");
app.get("/i/:ruleId", async (req, res) => {
  const ruleId = req.params.ruleId;
  loginStatus = req.cookies.userInfo ? true : false;
  console.log("餅乾好吃", req.cookies.userInfo);
  try {
    //取得某規定的詳細資料
    const ruleDetail = await getRuleById(ruleId);
    //取得某議題所有學校最新回報
    const ruleStatus = await foucusIssue(ruleId);
    //關於這個規定的所有回報次數
    const totalinfo = await informTime(ruleId);

    // console.log("totalinfo:", totalinfo);
    // console.log("ruleDetail:", ruleDetail);
    // console.log("ruleStatus", ruleStatus);

    if (!ruleDetail || ruleStatus.length == 0) {
      return res.status(404).render("signupResult", {
        result: "喔哦",
        message: "找不到這個規定",
        loginStatus,
      });
    }

    return res.render("issue", {
      ruleDetail,
      ruleStatus,
      totalinfo,
      loginStatus,
    });
  } catch (error) {
    console.error("Error in /i/:ruleId route:", error);
    return res.status(500).render("signupResult", {
      result: "喔哦",
      message: "伺服器似乎出現了點問題...",
      loginStatus,
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
const { create } = require("domain");
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
