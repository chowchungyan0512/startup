import { Router } from 'express';
import { findUserByUsername, toPublicUser } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const profileRouter = Router();

profileRouter.get('/', requireAuth, (req, res) => {
  res.json(toPublicUser(req.user));
});

profileRouter.put('/', requireAuth, (req, res) => {
  const { major, year, classes, studyStyle, bio } = req.body;
  Object.assign(req.user, {
    major: major ?? req.user.major,
    year: year ?? req.user.year,
    classes: classes ?? req.user.classes,
    studyStyle: studyStyle ?? req.user.studyStyle,
    bio: bio ?? req.user.bio,
  });

  res.json(toPublicUser(req.user));
});

// Public read-only lookup, used for the classmate profile page.
profileRouter.get('/:username', (req, res) => {
  const user = findUserByUsername(req.params.username);
  if (!user) {
    return res.status(404).json({ error: 'No classmate found with that username.' });
  }
  res.json(toPublicUser(user));
});
