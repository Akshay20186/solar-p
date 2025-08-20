require('dotenv').config();
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

conn.connect((err) => {
  if (err) return console.log('Error:', err.message);
  console.log('Connected successfully!');
  conn.end();
});


conn.query('SHOW TABLES', (err, results) => {
  if (err) throw err;
  console.log(results);
});
