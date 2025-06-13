// index.js

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

// Import route modules
const userRoutes = require('./routes/users');
const pgUserRoutes = require('./routes/pgUsers');
const projectRoutes = require('./routes/pgProjects');
const proposalRoutes = require('./routes/pgProposals');

// Initialize Express app
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Route Mounting ---
app.use('/users', userRoutes);
app.use('/pgusers', pgUserRoutes);
app.use('/projects', projectRoutes);
app.use('/proposals', proposalRoutes);

// --- Server Start ---
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
  // Log available routes to the console
  const availableRoutes = [
    { Method: 'GET',    Path: '/pgusers',        Description: 'Fetch all users with their projects' },
    { Method: 'GET',    Path: '/pgusers/:id',    Description: 'Fetch a single user by ID' },
    { Method: 'POST',   Path: '/pgusers',        Description: 'Create a new user' },
    { Method: 'PUT',    Path: '/pgusers/:id',    Description: 'Update a user\'s details' },
    { Method: 'DELETE', Path: '/pgusers/:id',    Description: 'Delete a user' },
    { Method: 'GET',    Path: '/projects',       Description: 'Fetch all projects with creator details' },
    { Method: 'GET',    Path: '/projects/:id',   Description: 'Fetch a single project by ID' },
    { Method: 'POST',   Path: '/projects',       Description: 'Create a new project' },
    { Method: 'PUT',    Path: '/projects/:id',   Description: 'Update a project' },
    { Method: 'DELETE', Path: '/projects/:id',   Description: 'Delete a project' },
    { Method: 'GET',    Path: '/proposals',      Description: 'Fetch all proposals with proposer and recipient' },
    { Method: 'GET',    Path: '/proposals/:id',  Description: 'Fetch a single proposal by ID' },
    { Method: 'POST',   Path: '/proposals',      Description: 'Create a new proposal' },
    { Method: 'PUT',    Path: '/proposals/:id',  Description: 'Update a proposal' },
    { Method: 'DELETE', Path: '/proposals/:id',  Description: 'Delete a proposal' },
    { Method: 'GET',    Path: '/users',          Description: 'Placeholder route for users (in-memory)' },

  ];
  console.log('\nAvailable API Endpoints:');
  console.table(availableRoutes);
});

// --- Graceful Shutdown ---
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal received: closing HTTP server and pg pool`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await pool.end();
    console.log('PostgreSQL pool has ended.');
    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
