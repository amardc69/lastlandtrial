// inbox-processing-server.js
const net = require('net');
const cassandra = require('cassandra-driver');
const { types } = cassandra;

// Create a client instance pointing to your Cassandra Docker container.
// Adjust the contactPoints and localDataCenter as needed.
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'messaging',
});

// Define queries to create a keyspace and a table (if they don't exist)
const createKeyspaceQuery = `
  CREATE KEYSPACE IF NOT EXISTS messaging WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': '1'
  }
`;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS inbox (
    id uuid PRIMARY KEY,
    message text,
    received_at timestamp
  )
`;

// Setup Cassandra by creating keyspace and table
async function setupCassandra() {
  try {
    console.log('[Cassandra] Starting setup of keyspace and table...');
    // Connect without a keyspace to create one if needed
    const tempClient = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
    });
    console.log('[Cassandra] Connected to Cassandra for keyspace setup.');
    await tempClient.execute(createKeyspaceQuery);
    console.log('[Cassandra] Keyspace "messaging" ensured.');
    await tempClient.shutdown();
    console.log('[Cassandra] Temporary client shutdown after keyspace setup.');

    // Now use the client with the keyspace to create the table
    await client.execute(createTableQuery);
    console.log('[Cassandra] Table "inbox" ensured.');
  } catch (error) {
    console.error('[Cassandra] Error setting up Cassandra:', error);
  }
}

setupCassandra();

// Create a TCP server that listens on port 6450
const PORT = 6450;
const server = net.createServer((socket) => {
  console.log(`[Inbox Server] Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', async (data) => {
    const message = data.toString();
    console.log(`[Inbox Server] Received message to store: "${message}"`);

    // Insert the message into Cassandra
    const query = 'INSERT INTO inbox (id, message, received_at) VALUES (?, ?, ?)';
    const params = [types.Uuid.random(), message, new Date()];

    try {
      console.log('[Inbox Server] Attempting to store message in Cassandra...');
      await client.execute(query, params, { prepare: true });
      console.log('[Inbox Server] Message stored in Cassandra successfully.');
      socket.write('Message stored successfully', () => {
        console.log('[Inbox Server] Sent acknowledgment to client.');
      });
    } catch (error) {
      console.error('[Inbox Server] Error storing message in Cassandra:', error);
      socket.write('Error storing message', () => {
        console.log('[Inbox Server] Sent error message to client.');
      });
    }
  });

  socket.on('end', () => {
    console.log(`[Inbox Server] Client at ${socket.remoteAddress}:${socket.remotePort} disconnected`);
  });

  socket.on('error', (err) => {
    console.error(`[Inbox Server] Socket error with client at ${socket.remoteAddress}:${socket.remotePort}: ${err.message}`);
  });
});

server.listen(PORT, () => {
  console.log(`[Inbox Server] Inbox Processing Server is listening on port ${PORT}`);
});
