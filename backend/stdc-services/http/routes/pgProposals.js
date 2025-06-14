const express = require('express');
const router = express.Router();
const {
    v4: uuidv4
} = require('uuid');
const pool = require('../config/db');

/**
 * Helper function to structure proposal data with nested user objects.
 * This is kept for the GET routes to maintain consistent output.
 */
const structureProposal = (row) => {
    const {
        proposerId,
        proposerName,
        proposerUsername,
        recipientId,
        recipientName,
        recipientUsername,
        ...proposalData
    } = row;

    // Nest proposer and recipient details
    proposalData.proposer = proposerId ? {
        id: proposerId,
        name: proposerName,
        username: proposerUsername
    } : null;

    proposalData.recipient = recipientId ? {
        id: recipientId,
        name: recipientName,
        username: recipientUsername
    } : null;

    return proposalData;
};

// GET route: Fetch all proposals with proposer and recipient details
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT
                prop.*,
                proposer.id AS "proposerId",
                proposer.name AS "proposerName",
                proposer.username AS "proposerUsername",
                recipient.id AS "recipientId",
                recipient.name AS "recipientName",
                recipient.username AS "recipientUsername"
            FROM "PGProposals" prop
            LEFT JOIN "PGUsers" AS proposer ON prop."proposerId" = proposer.id
            LEFT JOIN "PGUsers" AS recipient ON prop."recipientId" = recipient.id;
        `;
        const result = await pool.query(query);
        const proposals = result.rows.map(structureProposal);
        res.json(proposals);
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({
            error: 'Failed to fetch proposals',
            details: error.message
        });
    }
});

// GET route: Fetch a single proposal by its ID
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const query = `
            SELECT
                prop.*,
                proposer.id AS "proposerId",
                proposer.name AS "proposerName",
                proposer.username AS "proposerUsername",
                recipient.id AS "recipientId",
                recipient.name AS "recipientName",
                recipient.username AS "recipientUsername"
            FROM "PGProposals" prop
            LEFT JOIN "PGUsers" AS proposer ON prop."proposerId" = proposer.id
            LEFT JOIN "PGUsers" AS recipient ON prop."recipientId" = recipient.id
            WHERE prop.id = $1;
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length > 0) {
            const proposal = structureProposal(result.rows[0]);
            res.json(proposal);
        } else {
            res.status(404).json({
                error: 'Proposal not found'
            });
        }
    } catch (error) {
        console.error(`Error fetching proposal with id ${id}:`, error);
        res.status(500).json({
            error: 'Failed to fetch proposal',
            details: error.message
        });
    }
});

// POST route: Create a new project and associated proposals from a batch payload
router.post('/', async (req, res) => {
    const {
        proposals,
        senderId,
        receiverId
    } = req.body;

    // Basic validation for the new payload structure
    if (!Array.isArray(proposals) || proposals.length === 0 || !senderId || !receiverId) {
        return res.status(400).json({
            error: 'Missing required fields: proposals (must be a non-empty array), senderId, and receiverId are required.'
        });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start transaction

        // 1. Create a new project first
        const newProjectId = uuidv4();
        const projectQuery = `
            INSERT INTO "PGProjects" (id, "userId", name, description, "projectType")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const projectName = `Marketing Campaign - ${new Date().toLocaleDateString()}`;
        const projectDescription = `Project auto-generated for proposals to user ${receiverId}`;
        const projectValues = [newProjectId, senderId, projectName, projectDescription, 'ProposalFirst'];

        await client.query(projectQuery, projectValues);

        // 2. Prepare to insert all proposals
        const insertPromises = proposals.map(proposal => {
            const {
                title,
                description,
                platform,
                contentType,
                executionType,
                proposedStartDate,
                proposedEndDate,
                compensationType,
                compensationAmount,
                compensationCurrency,
                status,
                quantity
            } = proposal;

            // Validate each proposal object
            if (!title || !description || !compensationType) {
                throw new Error('Each proposal must have a title, description, and compensationType.');
            }

            const newProposalId = uuidv4();
            const proposalQuery = `
                INSERT INTO "PGProposals" (
                    id, title, description, "proposerId", "recipientId", "projectId",
                    platform, "contentType", "executionType", "proposedStartDate", "proposedEndDate",
                    "compensationType", "compensationAmount", "compensationCurrency", status, quantity
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                ) RETURNING *;
            `;
            const proposalValues = [
                newProposalId, title, description, senderId, receiverId, newProjectId,
                platform, contentType, executionType, proposedStartDate, proposedEndDate,
                compensationType, compensationAmount, compensationCurrency, status || 'PENDING', quantity || 1
            ];

            return client.query(proposalQuery, proposalValues);
        });

        const results = await Promise.all(insertPromises);
        const createdProposals = results.map(result => result.rows[0]);

        await client.query('COMMIT'); // Commit transaction
        res.status(201).json(createdProposals);

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback on error
        console.error("Error creating proposals in transaction:", error);

        // Foreign key violation
        if (error.code === '23503') {
            return res.status(400).json({
                error: 'Invalid senderId or receiverId. User not found.',
                details: error.message
            });
        }
        res.status(500).json({
            error: 'Failed to create proposals',
            details: error.message
        });
    } finally {
        client.release(); // Release client back to the pool
    }
});

// PUT route: Update an existing proposal by ID
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    // Create a dynamic list of fields to update from the request body
    const fieldsToUpdate = {};
    // Allowed fields based on the new schema
    const allowedFields = [
        'title', 'description', 'proposedStartDate', 'proposedEndDate',
        'compensationType', 'compensationAmount', 'compensationCurrency', 'status',
        'platform', 'contentType', 'executionType', 'quantity', 'projectId'
    ];

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            fieldsToUpdate[field] = req.body[field];
        }
    });

    const fieldKeys = Object.keys(fieldsToUpdate);
    if (fieldKeys.length === 0) {
        return res.status(400).json({
            error: 'No fields to update provided'
        });
    }

    // The trigger will automatically update the `updatedAt` field
    const setClauses = fieldKeys.map((key, index) => `"${key}" = $${index + 2}`).join(', ');
    const values = [id, ...fieldKeys.map(key => fieldsToUpdate[key])];

    try {
        const query = `UPDATE "PGProposals" SET ${setClauses} WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({
                error: 'Proposal not found'
            });
        }
    } catch (error) {
        console.error(`Error updating proposal with id ${id}:`, error);
        res.status(500).json({
            error: 'Failed to update proposal',
            details: error.message
        });
    }
});

// DELETE route: Remove a proposal by ID
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query('DELETE FROM "PGProposals" WHERE id = $1 RETURNING id;', [id]);
        if (result.rowCount > 0) {
            // Successfully deleted
            res.status(204).send();
        } else {
            res.status(404).json({
                error: 'Proposal not found'
            });
        }
    } catch (error) {
        console.error(`Error deleting proposal with id ${id}:`, error);
        res.status(500).json({
            error: 'Failed to delete proposal',
            details: error.message
        });
    }
});

module.exports = router;