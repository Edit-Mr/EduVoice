//抓取有關學校的 API

const fs = require('fs');
const path = require('path');

async function fetchSchoolData() {
    const jsonFilePath = path.resolve(__dirname, 'school.json'); // Assuming school.json is in the same directory as this script

    try {
        // Read the JSON file synchronously (you can also use asynchronous methods if needed)
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        // Extract all SchoolName values and create a map for SchoolId lookup
        const schools = jsonData.map(item => item.學校名稱);
        const locate = jsonData.map(item => item.縣市名稱);

        console.log('Successfully read all school names from JSON file');
        return {schools: schools,
                locate: locate};
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}


module.exports = { fetchSchoolData };