// 為了建立學校資料，讀取營養午餐資料的學校名稱，並插入到資料庫中現在，現在已經不需要了

// async function fetchSchoolData() {
//   const jsonFilePath = path.resolve(__dirname, 'school.json'); // Assuming school.json is in the same directory as this script

//   try {
//       // Read the JSON file synchronously (you can also use asynchronous methods if needed)
//       const data = fs.readFileSync(jsonFilePath, 'utf8');
//       const jsonData = JSON.parse(data);
//       // Extract all SchoolName values and create a map for SchoolId lookup
//       const schools = jsonData.map(item => item.學校名稱);
//       const locate = jsonData.map(item => item.縣市名稱);

//       console.log('Successfully read all school names from JSON file');
//       return {schools: schools,
//               locate: locate};
//   } catch (error) {
//       console.error('Error reading JSON file:', error);
//       return [];
//   }
// }

    //插入所有學校名稱
    // try {
    //     const { schools, locate } = await fetchSchoolData();
    //     for(let i = 1; i < schools.length; i++){
    //         const query = `
    //         INSERT INTO Schools (id,name,location)
    //         VALUES (?,?,?)
    //     `;
    //         const schoolName = schools[i-1];
    //         const city = locate[i-1];
    //         console.log(`插入 城市：${locate[i]}，學校名稱：${schools[i]}`);
    //         const params = [i,schoolName, city ];
    //         await conn.query(query, params);
    //     }
    // } catch (error) {
    //     console.error('Error insert school data', error);
    // }