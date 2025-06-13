// routes/pgUsers.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const parsePgArrayString = require('../utils/parsePgArray');

// GET route: Fetch all PGUsers accounts with nested data
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        pgu.id AS "pgUserId", pgu."userId" AS "pgu_baseUserId", pgu.email AS "pgUserEmail",
        pgu.name AS "pgUserName", pgu.username AS "pgUserUsername", pgu.avatarurl AS "pgUserAvatarUrl",
        pgu.deckurl AS "pgUserDeckUrl", pgu.bio AS "pgUserBio", pgu.followers AS "pgUserFollowers",
        pgu.following AS "pgUserFollowing", pgu.chatid AS "pgUserChatId", pgu.category AS "pgUserCategory",
        pgu."collaboratedWith" AS "pgUserCollaboratedWith", pgu.platforms AS "pgUserPlatforms",
        pgu."isVerified" AS "pgUserIsVerified", pgu.usertype AS "pgUserUserType",
        pgu."instagramLink" AS "pgUserInstagramLink", pgu."twitterLink" AS "pgUserTwitterLink",
        pgu."linkedinLink" AS "pgUserLinkedinLink", pgu."pinterestLink" AS "pgUserPinterestLink",
        pgu."facebookLink" AS "pgUserFacebookLink", pgu."youtubeLink" AS "pgUserYoutubeLink",
        pgu."createdAt" AS "pgUserCreatedAt", pgu."updatedAt" AS "pgUserUpdatedAt",
        u.id AS "baseUserId", u.name AS "baseUserName", u.email AS "baseUserEmail",
        p.id AS "projectId", p.name AS "projectName", p.description AS "projectDescription"
      FROM "PGUsers" pgu
      LEFT JOIN "User" u ON pgu."userId" = u.id
      LEFT JOIN "PGProjects" p ON p."userId" = pgu.id;
    `;
    const result = await pool.query(query);

    const pgUsersMap = new Map();
    result.rows.forEach(row => {
      const pgUserId = row.pgUserId;
      if (!pgUsersMap.has(pgUserId)) {
        pgUsersMap.set(pgUserId, {
          id: pgUserId, userId: row.pgu_baseUserId, email: row.pgUserEmail, name: row.pgUserName,
          username: row.pgUserUsername, avatarUrl: row.pgUserAvatarUrl, deckUrl: row.pgUserDeckUrl,
          bio: row.pgUserBio, followers: row.pgUserFollowers, following: row.pgUserFollowing,
          chatId: row.pgUserChatId, category: parsePgArrayString(row.pgUserCategory),
          collaboratedWith: row.pgUserCollaboratedWith, platforms: parsePgArrayString(row.pgUserPlatforms),
          isVerified: row.pgUserIsVerified, userType: row.pgUserUserType,
          instagramLink: row.pgUserInstagramLink, twitterLink: row.pgUserTwitterLink,
          linkedinLink: row.pgUserLinkedinLink, pinterestLink: row.pgUserPinterestLink,
          facebookLink: row.pgUserFacebookLink, youtubeLink: row.pgUserYoutubeLink,
          createdAt: row.pgUserCreatedAt, updatedAt: row.pgUserUpdatedAt,
          user: row.baseUserId ? { id: row.baseUserId, name: row.baseUserName, email: row.baseUserEmail } : null,
          projects: []
        });
      }
      if (row.projectId) {
        pgUsersMap.get(pgUserId).projects.push({
          id: row.projectId, name: row.projectName, description: row.projectDescription,
        });
      }
    });
    res.json(Array.from(pgUsersMap.values()));
  } catch (error) {
    console.error("Error fetching PGUsers:", error);
    res.status(500).json({ error: 'Failed to fetch PGUsers', details: error.message });
  }
});

// GET route: Fetch a single PGUser by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT pgu.*, u.id AS "actualBaseUserId", u.name AS "baseUserName", u.email AS "baseUserEmail"
      FROM "PGUsers" pgu
      LEFT JOIN "User" u ON pgu."userId" = u.id
      WHERE pgu.id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length > 0) {
      const { actualBaseUserId, baseUserName, baseUserEmail, ...pgUserRow } = result.rows[0];
      const response = {
        ...pgUserRow,
        user: actualBaseUserId ? { id: actualBaseUserId, name: baseUserName, email: baseUserEmail } : null
      };
      res.json(response);
    } else {
      res.status(404).json({ error: 'PGUser not found' });
    }
  } catch (error) {
    console.error(`Error fetching PGUser with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch PGUser', details: error.message });
  }
});

// GET route: Fetch a single PGUser by username
router.get('/username/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const query = `
            SELECT
                pgu.id AS "pgUserId", pgu."userId" AS "pgu_baseUserId", pgu.email AS "pgUserEmail", pgu.name AS "pgUserName",
                pgu.username AS "pgUserUsername", pgu.avatarurl AS "pgUserAvatarUrl", pgu.deckurl AS "pgUserDeckUrl",
                pgu.bio AS "pgUserBio", pgu.followers AS "pgUserFollowers", pgu.following AS "pgUserFollowing",
                pgu.chatid AS "pgUserChatId", pgu.category AS "pgUserCategory", pgu."collaboratedWith" AS "pgUserCollaboratedWith",
                pgu.platforms AS "pgUserPlatforms", pgu."isVerified" AS "pgUserIsVerified", pgu.usertype AS "pgUserUserType",
                pgu."instagramLink" AS "pgUserInstagramLink", pgu."twitterLink" AS "pgUserTwitterLink", pgu."linkedinLink" AS "pgUserLinkedinLink",
                pgu."pinterestLink" AS "pgUserPinterestLink", pgu."facebookLink" AS "pgUserFacebookLink", pgu."youtubeLink" AS "pgUserYoutubeLink",
                pgu."createdAt" AS "pgUserCreatedAt", pgu."updatedAt" AS "pgUserUpdatedAt",
                u.id AS "baseUserId", u.name AS "baseUserName", u.email AS "baseUserEmail",
                p.id AS "projectId", p.name AS "projectName", p.description AS "projectDescription"
            FROM "PGUsers" pgu
            LEFT JOIN "User" u ON pgu."userId" = u.id
            LEFT JOIN "PGProjects" p ON p."userId" = pgu.id
            WHERE pgu.username = $1;
        `;
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'PGUser not found with that username' });
        }

        const firstRow = result.rows[0];
        const pgUser = {
            id: firstRow.pgUserId, userId: firstRow.pgu_baseUserId, email: firstRow.pgUserEmail, name: firstRow.pgUserName,
            username: firstRow.pgUserUsername, avatarUrl: firstRow.pgUserAvatarUrl, deckUrl: firstRow.pgUserDeckUrl,
            bio: firstRow.pgUserBio, followers: firstRow.pgUserFollowers, following: firstRow.pgUserFollowing,
            chatId: firstRow.pgUserChatId, category: parsePgArrayString(firstRow.pgUserCategory),
            collaboratedWith: parsePgArrayString(firstRow.pgUserCollaboratedWith), platforms: parsePgArrayString(firstRow.pgUserPlatforms),
            isVerified: firstRow.pgUserIsVerified, userType: firstRow.pgUserUserType,
            instagramLink: firstRow.pgUserInstagramLink, twitterLink: firstRow.pgUserTwitterLink, linkedinLink: firstRow.pgUserLinkedinLink,
            pinterestLink: firstRow.pgUserPinterestLink, facebookLink: firstRow.pgUserFacebookLink, youtubeLink: firstRow.pgUserYoutubeLink,
            createdAt: firstRow.pgUserCreatedAt, updatedAt: firstRow.pgUserUpdatedAt,
            user: firstRow.baseUserId ? { id: firstRow.baseUserId, name: firstRow.baseUserName, email: firstRow.baseUserEmail } : null,
            projects: []
        };

        result.rows.forEach(row => {
            if (row.projectId) {
                pgUser.projects.push({ id: row.projectId, name: row.projectName, description: row.projectDescription });
            }
        });

        res.json(pgUser);
    } catch (error) {
        console.error(`Error fetching PGUser with username ${username}:`, error);
        res.status(500).json({ error: 'Failed to fetch PGUser', details: error.message });
    }
});

// GET route: Fetch all projects for a specific PGUser
router.get('/:pgUserId/projects', async (req, res) => {
  const { pgUserId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "PGProjects" WHERE "userId" = $1', [pgUserId]);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching projects for PGUser ${pgUserId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user projects', details: error.message });
  }
});


module.exports = router;