import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export const miscRouter = Router();

// Calls a third-party API server-side, so the API key (none needed here) and
// the request itself never touch the browser directly.
miscRouter.get('/study-break', async (req, res) => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Joke API responded with ${response.status}`);
    }
    const data = await response.json();
    res.json({ joke: data.joke });
  } catch (error) {
    res.status(502).json({ error: 'Could not reach the joke service.' });
  }
});

// Placeholder notification feed for the logged-in user, until the
// WebSocket deliverable pushes these in real time instead.
miscRouter.get('/notifications', requireAuth, (req, res) => {
  res.json([
    { id: 1, message: 'Jordan Lee joined your CS 260 session.', minutesAgo: 2 },
    { id: 2, message: 'Maya Patel sent a message in Biology 180.', minutesAgo: 18 },
  ]);
});
