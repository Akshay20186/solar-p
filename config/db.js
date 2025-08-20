require('dotenv').config(); const mysql = require('mysql2');

// create a connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT
});

// test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting:', err.message);
    return;
  }
  console.log('Connected to MySQL!');
});
