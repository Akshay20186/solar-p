const mysql = require('mysql2/promise'); // must be /promise
require('dotenv').config();

// ✅ create a pool and name it pool (so it matches module.exports)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ export pool
module.exports = pool;
