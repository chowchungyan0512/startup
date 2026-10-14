import { authTokens, findUserById } from '../db.js';

// Attaches req.user when a valid session cookie is present, but never blocks the request.
export function attachUser(req, res, next) {
  const token = req.cookies?.token;
  const userId = token && authTokens.get(token);
  req.user = userId ? findUserById(userId) : null;
  next();
}

// Blocks the request unless attachUser found a logged-in user.
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'You must be logged in to do that.' });
  }
  next();
}
