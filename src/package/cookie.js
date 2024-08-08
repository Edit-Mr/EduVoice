// 設定 cookie
// 可以傳遞多個參數，第一個參數是 res，第二個參數是 cookieName，第三個參數是 data，第四個參數是 options
// 設定範例:setCookie(res, "userInfo", { email, school, name }, { maxAge: 2 * 60 * 60 * 1000 });

const setCookie = (res,cookieName, JWTDATA, options = {}) => {
  const defaultOptions = {
    httpOnly: true, // 防止 JavaScript 讀取
    secure: true, // 只有在 HTTPS 上傳送
    maxAge: 24 * 60 * 60 * 1000, // 有效期 1 天
    path: "/", // 設置 cookie 的路徑
  };

  const finalOptions = { ...defaultOptions, ...options };
  try {
    // 設定 cookie
    res.cookie(cookieName, JWTDATA, finalOptions);
  }
  catch (e) {
    console.log("Error in setCookie", e);
  }
};

module.exports = setCookie;
