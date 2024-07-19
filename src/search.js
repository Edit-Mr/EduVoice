//搜尋
const pool = require("./package/sqlconn.js");

async function sdoget(table, keyword) {
  let conn;
  try {
    conn = await pool.getConnection();
    let attr1, attr2;
    if (table === "Schools") {
      attr1 = "name";
      attr2 = "location";
    } else {
      attr1 = "title";
      attr2 = "content";
    }

    const query1 = `
        SELECT * FROM ${table} WHERE ${attr1} LIKE ? or ${attr2} LIKE ?
        `;
    const params = [`%${keyword}%`, `%${keyword}%`];
    const res = await conn.query(query1, params);

    console.log(`${table} search result:`, res);
    if (res.length > 0) {
      return res; // Return res if needed
    } else {
      console.log(`${table} No res found`);
      return [];
    }
  } catch (err) {
    console.error("Error search :", err);
    return [];
  } finally {
    if (conn) conn.end();
  }
}

async function search(keyword) {
  try {
    const [schoolRes, ArticleRes] = await Promise.all([
      sdoget("Schools", keyword),
      sdoget("Rules", keyword),
    ]);

    // Format schoolRes into the desired format
    const schools = schoolRes.map((school) => ({
      id: school.id,
      name: school.name,
    }));

    // Format ArticleRes into the desired format
    const rules = ArticleRes.map((article) => ({
      id: article.id,
      title: article.title,
    }));
    return { schools, rules };
  } catch (error) {
    console.error("Error in search function:", error);
    return { schools: [], rules: [] }; // Return empty arrays or handle error as needed
  }
}
module.exports = { search };
