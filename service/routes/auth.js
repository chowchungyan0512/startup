import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { authTokens, createUser, findUserByEmail, toPublicUser } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();

function startSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex');
  authTokens.set(token, userId);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
}

authRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'email, password, and name are required.' });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const username = email.split('@')[0].toLowerCase();
  const user = createUser({ email, passwordHash, name, username, major: '', year: '', classes: '' });

  startSession(res, user.id);
  res.status(201).json(toPublicUser(user));
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email || '');
  const passwordMatches = user && (await bcrypt.compare(password || '', user.passwordHash));

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }

  startSession(res, user.id);
  res.json(toPublicUser(user));
});

authRouter.post('/logout', requireAuth, (req, res) => {
  authTokens.delete(req.cookies.token);
  res.clearCookie('token');
  res.status(204).end();
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json(toPublicUser(req.user));
});
