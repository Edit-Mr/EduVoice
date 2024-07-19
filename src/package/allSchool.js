const pool = require("./package/sqlconn.js");

async function allSchool() {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = "SELECT * FROM Schools";
    const rows = await conn.query(query);
    const schoolsByLocation = rows.reduce((acc, school) => {
      const location = school.location;
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(school);
      return acc;
    }, {});
    return Object.values(schoolsByLocation);
  } catch (err) {
    console.error("Error retrieving schools:", err);
    return [];
  } finally {
    if (conn) conn.end();
  }
}

async function isSchoolNameExists(schoolName) {
  const allSchools = await allSchool();
  const flatSchools = allSchools.reduce((acc, val) => acc.concat(val), []);
  return flatSchools.some((school) => school.name == schoolName);
}

module.exports = { allSchool, isSchoolNameExists }; // Exporting both functions
