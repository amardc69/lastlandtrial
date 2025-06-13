const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4001;

// Enable CORS
app.use(cors());

// Body parser with limits and error handling
app.use(bodyParser.json({
  limit: '1mb',              // max size 1MB
  strict: true               // only parse objects and arrays
}));

// Global error handler for body-parser errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err.type === 'request.aborted') {
    console.error('Body parse error:', err);
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid or aborted JSON payload'
    });
  }
  next(err);
});

// Greeting endpoint (no JSON body required)
app.get('/', (req, res) => {
  const { action, name } = req.query;

  if (action === 'greet') {
    const user = name || 'guest';
    return res.json({ decision: { reply: `Hello, ${user}!` } });
  }

  return res.json({ decision: { status: 'ok', query: req.query } });
});

// Temperature-measure endpoint
app.post('/measure', (req, res) => {
  const { temperature } = req.body || {};

  if (typeof temperature === 'number') {
    let decision;
    if (temperature >= 30) decision = { fanSpeed: 'high', message: 'Temperature is high' };
    else if (temperature >= 20) decision = { fanSpeed: 'medium', message: 'Temperature is moderate' };
    else decision = { fanSpeed: 'low', message: 'Temperature is low' };

    return res.json({ decision });
  }

  return res.status(400).json({
    error: 'Invalid Payload',
    message: 'Expected JSON { temperature: number }'
  });
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`DMS service listening on port ${PORT}`);
});
