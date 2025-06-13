// routes/users.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET route: Fetch all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "User"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// GET route: Fetch a single user by their ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "User" WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
});

module.exports = router;