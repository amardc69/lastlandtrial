// routes/pgProjects.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET route: Fetch all projects
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT p.*,
             pgu.id AS "pgUserIdInProject", pgu.username AS "pgUserNameInProject",
             u.id AS "baseUserIdInProject", u.name AS "baseUserNameInProject", u.email AS "baseUserEmailInProject"
      FROM "PGProjects" p
      LEFT JOIN "PGUsers" pgu ON p."userId" = pgu.id
      LEFT JOIN "User" u ON pgu."userId" = u.id;
    `;
    const result = await pool.query(query);
    const projects = result.rows.map(row => {
        const { pgUserIdInProject, pgUserNameInProject, baseUserIdInProject, baseUserNameInProject, baseUserEmailInProject, ...projectData } = row;
        projectData.user = pgUserIdInProject ? {
            id: pgUserIdInProject,
            username: pgUserNameInProject,
            baseUser: baseUserIdInProject ? { id: baseUserIdInProject, name: baseUserNameInProject, email: baseUserEmailInProject } : null
        } : null;
        return projectData;
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

// GET route: Fetch a single project by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT p.*,
             pgu.id AS "pgUserIdInProject", pgu.username AS "pgUserNameInProject",
             u.id AS "baseUserIdInProject", u.name AS "baseUserNameInProject", u.email AS "baseUserEmailInProject"
      FROM "PGProjects" p
      LEFT JOIN "PGUsers" pgu ON p."userId" = pgu.id
      LEFT JOIN "User" u ON pgu."userId" = u.id
      WHERE p.id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length > 0) {
      const { pgUserIdInProject, pgUserNameInProject, baseUserIdInProject, baseUserNameInProject, baseUserEmailInProject, ...projectData } = result.rows[0];
      projectData.user = pgUserIdInProject ? {
          id: pgUserIdInProject,
          username: pgUserNameInProject,
          baseUser: baseUserIdInProject ? { id: baseUserIdInProject, name: baseUserNameInProject, email: baseUserEmailInProject } : null
      } : null;
      res.json(projectData);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
});

// POST route: Create a new project
router.post('/', async (req, res) => {
  const { userId, name, description, dueDate, status } = req.body;
  const projectId = `p${Date.now()}`;
  try {
    const query = `
      INSERT INTO "PGProjects"
        (id, "userId", name, description, "dueDate", status, progress, team, files, tasks, "lastActivity")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const values = [
        projectId, userId, name, description, new Date(dueDate), status, 0, '[]', '[]', '[]', 'Project created'
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    if (error.code === '23503') {
        return res.status(400).json({ error: 'Invalid userId. PGUser not found.', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

// PUT route: Update an existing project by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { projectName, projectDescription, projectType, projectBudget, projectTimeline, projectStatus } = req.body;
  const fieldsToUpdate = {};
  if (projectName !== undefined) fieldsToUpdate.name = projectName;
  if (projectDescription !== undefined) fieldsToUpdate.description = projectDescription;
  if (projectType !== undefined) fieldsToUpdate.projectType = projectType;
  if (projectBudget !== undefined) fieldsToUpdate.projectBudget = projectBudget;
  if (projectTimeline !== undefined) fieldsToUpdate.projectTimeline = new Date(projectTimeline);
  if (projectStatus !== undefined) fieldsToUpdate.status = projectStatus;

  const fieldKeys = Object.keys(fieldsToUpdate);
  if (fieldKeys.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided' });
  }

  const setClauses = fieldKeys.map((key, index) => `"${key}" = $${index + 2}`).join(', ');
  const values = [id, ...fieldKeys.map(key => fieldsToUpdate[key])];
  try {
    const query = `UPDATE "PGProjects" SET ${setClauses} WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to update project', details: error.message });
  }
});

// DELETE route: Remove a project by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM "PGProjects" WHERE id = $1 RETURNING id;', [id]);
    if (result.rowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
});

module.exports = router;