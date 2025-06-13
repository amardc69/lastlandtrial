// routes/pgProposals.js

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Using uuid for unique ID generation
const pool = require('../config/db');
const parsePgArrayString = require('../utils/parsePgArray');

/**
 * Helper function to structure proposal data with nested user objects
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

  // Manually parse array fields that might come back as strings
  proposalData.campaignGoals = parsePgArrayString(proposalData.campaignGoals);
  proposalData.keyMessagePoints = parsePgArrayString(proposalData.keyMessagePoints);
  proposalData.additionalPerks = parsePgArrayString(proposalData.additionalPerks);
  proposalData.keyPerformanceIndicators = parsePgArrayString(proposalData.keyPerformanceIndicators);


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

// POST route: Create a new proposal
router.post('/', async (req, res) => {
  const {
    title,
    description,
    proposerId,
    recipientId,
    deliverables,
    compensationType,
    exclusivityRequired,
    projectBriefUrl = null,
    campaignGoals = [],
    targetAudience = null,
    keyMessagePoints = [],
    brandGuidelinesUrl = null,
    proposedStartDate = null,
    proposedEndDate = null,
    contentSubmissionDeadline = null,
    postingSchedule = null,
    compensationAmount = null,
    compensationCurrency = null,
    compensationDetails = null,
    additionalPerks = [],
    paymentTerms = null,
    exclusivityPeriod = null,
    exclusivityDetails = null,
    contentUsageRights = null,
    contentOwnership = null,
    reportingRequirements = null,
    keyPerformanceIndicators = [],
    primaryContactEmail = null,
    negotiationHistory = null,
    contractUrl = null,
    internalNotes = null,
    status = 'DRAFT', // Default status from schema
    proposalExpiresAt = null,
  } = req.body;

  // Basic validation
  if (!title || !description || !proposerId || !recipientId || !deliverables || !compensationType || exclusivityRequired === undefined) {
    return res.status(400).json({
      error: 'Missing required fields: title, description, proposerId, recipientId, deliverables, compensationType, exclusivityRequired'
    });
  }

  const newProposalId = `prop_${uuidv4()}`;

  try {
    const query = `
      INSERT INTO "PGProposals" (
        id, title, description, "proposerId", "recipientId", deliverables, "compensationType", "exclusivityRequired", "projectBriefUrl", "campaignGoals", "targetAudience", "keyMessagePoints", "brandGuidelinesUrl", "proposedStartDate", "proposedEndDate", "contentSubmissionDeadline", "postingSchedule", "compensationAmount", "compensationCurrency", "compensationDetails", "additionalPerks", "paymentTerms", "exclusivityPeriod", "exclusivityDetails", "contentUsageRights", "contentOwnership", "reportingRequirements", "keyPerformanceIndicators", "primaryContactEmail", "negotiationHistory", "contractUrl", "internalNotes", status, "proposalExpiresAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34
      ) RETURNING *;
    `;
    const values = [
      newProposalId, title, description, proposerId, recipientId, deliverables, compensationType, exclusivityRequired, projectBriefUrl, campaignGoals, targetAudience, keyMessagePoints, brandGuidelinesUrl, proposedStartDate, proposedEndDate, contentSubmissionDeadline, postingSchedule, compensationAmount, compensationCurrency, compensationDetails, additionalPerks, paymentTerms, exclusivityPeriod, exclusivityDetails, contentUsageRights, contentOwnership, reportingRequirements, keyPerformanceIndicators, primaryContactEmail, negotiationHistory, contractUrl, internalNotes, status, proposalExpiresAt
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating proposal:", error);
    // Foreign key violation
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Invalid proposerId or recipientId. User not found.',
        details: error.message
      });
    }
    res.status(500).json({
      error: 'Failed to create proposal',
      details: error.message
    });
  }
});

// PUT route: Update an existing proposal by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    
    // Create a dynamic list of fields to update from the request body
    const fieldsToUpdate = {};
    const allowedFields = [
        'title', 'description', 'projectBriefUrl', 'campaignGoals', 'targetAudience',
        'keyMessagePoints', 'brandGuidelinesUrl', 'deliverables', 'proposedStartDate',
        'proposedEndDate', 'contentSubmissionDeadline', 'postingSchedule', 'compensationType',
        'compensationAmount', 'compensationCurrency', 'compensationDetails', 'additionalPerks',
        'paymentTerms', 'exclusivityRequired', 'exclusivityPeriod', 'exclusivityDetails',
        'contentUsageRights', 'contentOwnership', 'reportingRequirements', 'keyPerformanceIndicators',
        'primaryContactEmail', 'negotiationHistory', 'contractUrl', 'internalNotes', 'status',
        'rejectionReason', 'withdrawalReason', 'cancellationReason', 'proposalSentAt',
        'proposalViewedAt', 'proposalRespondedAt', 'proposalExpiresAt'
    ];

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            fieldsToUpdate[field] = req.body[field];
        }
    });

    const fieldKeys = Object.keys(fieldsToUpdate);
    if (fieldKeys.length === 0) {
        return res.status(400).json({ error: 'No fields to update provided' });
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
            res.status(404).json({ error: 'Proposal not found' });
        }
    } catch (error) {
        console.error(`Error updating proposal with id ${id}:`, error);
        res.status(500).json({ error: 'Failed to update proposal', details: error.message });
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