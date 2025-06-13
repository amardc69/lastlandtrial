import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const messages = [];

// Define the weather tool
const weatherTool = tool({
  description: 'Get the weather in a location (in Celsius)',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: Math.round((Math.random() * 30 + 5) * 10) / 10, // Random temp between 5°C and 35°C
  }),
});

// Chat endpoint that streams responses
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    // Add user message to conversation history
    messages.push({ role: 'user', content: message });

    // Set headers for streaming plain text
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      tools: {
        weather: weatherTool,
      },
      maxSteps: 5
    });

    let fullResponse = '';
    // Stream text chunks directly to the client as they arrive
    for await (const delta of result.textStream) {
      fullResponse += delta;
      res.write(delta);
    }
    // Optionally, update conversation history with the full assistant reply
    messages.push({ role: 'assistant', content: fullResponse });
    res.end();
  } catch (error) {
    console.error(error);
    // If an error occurs after headers have been sent, you might consider logging and closing the stream gracefully.
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
