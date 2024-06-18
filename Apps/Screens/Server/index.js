const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// สร้างการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: 'Fridge to feast',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// สร้าง API endpoint
app.get('/api/data', (req, res) => {
  let sql = 'SELECT * FROM mytable';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});