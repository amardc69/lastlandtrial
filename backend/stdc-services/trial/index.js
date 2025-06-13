// const { Pool } = require('pg');
// const { v4: uuidv4 } = require('uuid');

// // --- Database Connection Configuration ---
// // Ensure these details are correct for your environment
// const pool = new Pool({
//     user: 'postgres', // Replace with your DB user if different
//     host: '43.204.140.88', // Replace with your DB host if different
//     database: 'postgres',    // Replace with your DB name if different
//     password: 'mysecretpassword', // Replace with your DB password
//     port: 5432,              // Default PostgreSQL port
// });

// // --- Helper function to insert a User ---
// async function insertUser(userData) {
//     let client;
//     try {
//         client = await pool.connect();
//         const insertQuery = `
//             INSERT INTO "User" (
//                 id, email, "phoneNumber", avatarurl, "hashedPassword", name,
//                 signupoption, "isEmailVerified", promotionalground, "emailVerifiedAt",
//                 "twoFactorEnabled", "lastLoginAt"
//             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//             RETURNING *;
//         `;
//         const values = [
//             userData.id, userData.email, userData.phoneNumber, userData.avatarurl,
//             userData.hashedPassword, userData.name, userData.signupoption,
//             userData.isEmailVerified, userData.promotionalground, userData.emailVerifiedAt,
//             userData.twoFactorEnabled, userData.lastLoginAt
//         ];
//         const result = await client.query(insertQuery, values);
//         return result.rows.length > 0 ? result.rows[0] : null;
//     } catch (error) {
//         console.error(`Error inserting base user ${userData.email}:`, error.stack);
//         // If it's a unique constraint violation for email or ID, we might want to fetch the existing user
//         if (error.code === '23505') { // Unique violation
//             console.warn(`User with email ${userData.email} or id ${userData.id} might already exist.`);
//             // For simplicity, returning null here, but in a real app, you might fetch the existing user.
//         }
//         return null;
//     } finally {
//         if (client) client.release();
//     }
// }

// // --- Async Function to Insert PGUser Data ---
// async function insertPGUser(pgUserData) {
//     let client;
//     try {
//         client = await pool.connect();
//         const insertQuery = `
//             INSERT INTO "PGUsers" (
//                 id, "userId", email, password, name, username, avatarurl, deckurl, bio,
//                 followers, following, chatid, category, "collaboratedWith", platforms,
//                 "isVerified", usertype, "instagramLink", "twitterLink", "linkedinLink",
//                 "pinterestLink", "facebookLink", "youtubeLink"
//             ) VALUES (
//                 $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
//                 $17, $18, $19, $20, $21, $22, $23
//             )
//             RETURNING *;
//         `;
//         const values = [
//             pgUserData.id, pgUserData.userId, pgUserData.email, pgUserData.password,
//             pgUserData.name, pgUserData.username, pgUserData.avatarurl, pgUserData.deckurl,
//             pgUserData.bio, pgUserData.followers, pgUserData.following, pgUserData.chatid,
//             pgUserData.category, pgUserData.collaboratedWith, pgUserData.platforms,
//             pgUserData.isVerified, pgUserData.usertype, pgUserData.instagramLink,
//             pgUserData.twitterLink, pgUserData.linkedinLink, pgUserData.pinterestLink,
//             pgUserData.facebookLink, pgUserData.youtubeLink
//         ];
//         const result = await client.query(insertQuery, values);
//         return result.rows.length > 0 ? result.rows[0] : null;
//     } catch (error) {
//         console.error(`Error inserting PGUser ${pgUserData.username}:`, error.stack);
//         if (error.code === '23505') { // Unique violation
//             console.warn(`PGUser with username ${pgUserData.username}, chatid ${pgUserData.chatid}, or userId ${pgUserData.userId} might already exist.`);
//         }
//         return null;
//     } finally {
//         if (client) client.release();
//     }
// }

// // --- MrBeast Data ---
// const mrBeastData = {
//     id: 'mrbeast-unique-id', // You can keep this or use uuidv4() for a new unique ID
//     name: 'MrBeast',
//     username: '@mrbeast',
//     avatarUrl: 'https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s160-c-k-c0x00ffffff-no-rj', // Common MrBeast YouTube avatar URL
//     categories: ['SCIENCE', 'BUSINESS', 'SPIRITUALITY'],
//     platforms: ['YOUTUBE', 'INSTAGRAM', 'TWITTER', 'FACEBOOK', 'TIKTOK'] // MrBeast is on TikTok, not Pinterest/LinkedIn typically
// };

// // --- Main Function to Process MrBeast ---
// async function main() {
//     console.log(`Starting to process MrBeast (${mrBeastData.username})...`);

//     // 1. Create or fetch base User
//     const baseUserEmail = `${mrBeastData.username}@example.com`; // Create a unique email for MrBeast
//     const baseUserId = uuidv4(); // Generate new UUID for User table id

//     const baseUser = {
//         id: baseUserId,
//         email: baseUserEmail,
//         phoneNumber: null,
//         avatarurl: mrBeastData.avatarUrl,
//         hashedPassword: `password_mrbeast`, // Placeholder password
//         name: mrBeastData.name,
//         signupoption: 'CREDENTIALS',
//         isEmailVerified: true,
//         promotionalground: false,
//         emailVerifiedAt: new Date(),
//         twoFactorEnabled: false,
//         lastLoginAt: new Date()
//     };

//     const insertedBaseUser = await insertUser(baseUser);

//     if (!insertedBaseUser) {
//         console.error(`Failed to create or fetch base user for ${mrBeastData.name}. Skipping PGUser insertion.`);
//         await pool.end();
//         console.log('Connection pool closed.');
//         return; // Exit if base user creation failed
//     }
//     console.log(`Base user processed for ${mrBeastData.name} with User ID: ${insertedBaseUser.id}`);

//     // 2. Create PGUser
//     const pgUserRecordId = uuidv4(); // Unique ID for the PGUsers record itself
//     const pgUserChatId = uuidv4();   // Unique chat ID

//     const newPGUser = {
//         id: pgUserRecordId,
//         userId: insertedBaseUser.id, // Link to the User table record
//         email: insertedBaseUser.email,
//         password: `pg_password_mrbeast`, // Placeholder password
//         name: mrBeastData.name,
//         username: `@${mrBeastData.username}`,
//         avatarurl: mrBeastData.avatarUrl,
//         deckurl: null,
//         bio: `The biggest YouTuber in the world. Known for his elaborate stunts, challenges, and philanthropy.`,
//         followers: '280M+', // Approximate current followers, use string for large numbers
//         following: '50',
//         chatid: pgUserChatId,
//         category: mrBeastData.categories,
//         collaboratedWith: [],
//         platforms: mrBeastData.platforms,
//         isVerified: true,
//         usertype: 'INFLUENCER',
//         instagramLink: mrBeastData.platforms.includes('INSTAGRAM') ? `https://instagram.com/${mrBeastData.username}` : null,
//         twitterLink: mrBeastData.platforms.includes('TWITTER') ? `https://twitter.com/${mrBeastData.username}` : null,
//         linkedinLink: null,
//         pinterestLink: null,
//         facebookLink: mrBeastData.platforms.includes('FACEBOOK') ? `https://facebook.com/${mrBeastData.username}` : null,
//         youtubeLink: mrBeastData.platforms.includes('YOUTUBE') ? `https://youtube.com/@${mrBeastData.username}` : null
//     };

//     const insertedPGUser = await insertPGUser(newPGUser);

//     if (insertedPGUser) {
//         console.log(`PGUser created successfully for ${mrBeastData.name} with PGUser ID: ${insertedPGUser.id}`);
//     } else {
//         console.error(`Failed to create PGUser for ${mrBeastData.name}.`);
//     }

//     console.log('\n--- MrBeast processing complete ---');
//     await pool.end();
//     console.log('Connection pool closed.');
// }

// // Run the main function
// main().catch(error => {
//     console.error('Unhandled error during MrBeast processing:', error);
//     pool.end().then(() => console.log('Pool closed due to error in main.'));
// });

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// --- Middleware ---
// Enable CORS for all routes, allowing requests from your Next.js app
app.use(cors({
  origin: 'http://localhost:3000' // Adjust if your Next.js app runs on a different port
}));

// Parse incoming JSON requests
app.use(express.json());


// --- API Route ---
app.post('/api/proposal', (req, res) => {
    console.log("===================================");
    console.log("🎉 New Proposal Received at:", new Date().toLocaleString());
    console.log("===================================");

    // Destructure the data from the request body
    const { selectedCards, integrationDetails, finalTotal } = req.body;

    // Print the received data to the console
    console.log("\n--- Selected Services ---");
    console.log(JSON.stringify(selectedCards, null, 2));

    console.log("\n--- Integration Details ---");
    console.log(JSON.stringify(integrationDetails, null, 2));

    console.log("\n--- Final Total ---");
    console.log(`₹${finalTotal.toLocaleString()}`);
    
    console.log("\n===================================\n");

    // Send a success response back to the client
    res.status(200).json({ 
        message: 'Proposal received successfully!',
        status: 'success'
    });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running indefinitely on http://localhost:${PORT}`);
    console.log("Waiting for proposals... Press CTRL + C to stop.");
});