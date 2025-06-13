// config/db.js

const { Pool } = require('pg');
require('dotenv').config();

// Initialize pg Pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // The port should be a number, so we parse it
  port: parseInt(process.env.DB_PORT, 10),
});

// Test DB connection (no changes needed here)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    if (res && res.rows && res.rows.length > 0) {
        console.log('Successfully connected to the database at:', res.rows[0].now);
    } else {
        console.log('Successfully connected to the database, but no rows returned from SELECT NOW().');
    }
  }
});

module.exports = pool;