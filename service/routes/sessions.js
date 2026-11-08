import { Router } from 'express';
import { addSessionParticipant, createSession, getSessionById, getSessions, toPublicUser } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const sessionsRouter = Router();

function withHost(session) {
  return { ...session, host: toPublicUser(session.host) };
}

// GET /api/sessions?course=cs+260&location=library
sessionsRouter.get('/', async (req, res) => {
  const { course, location } = req.query;
  const sessions = await getSessions();

  const results = sessions.filter((session) => {
    const matchesCourse = !course || session.course.toLowerCase().includes(String(course).toLowerCase());
    const matchesLocation = !location || session.location.toLowerCase().includes(String(location).toLowerCase());
    return matchesCourse && matchesLocation;
  });

  res.json(results.map(withHost));
});

sessionsRouter.get('/mine', requireAuth, async (req, res) => {
  const sessions = await getSessions();
  const mine = sessions.filter(
    (session) => session.host.id === req.user.id || session.participants.includes(req.user.id)
  );
  res.json(mine.map(withHost));
});

const MAX_SHORT_FIELD = 200;
const MAX_DETAILS = 2000;
const MIN_CAPACITY = 2;
const MAX_CAPACITY = 20;

sessionsRouter.post('/', requireAuth, async (req, res) => {
  const course = String(req.body.course || '').trim();
  const date = String(req.body.date || '').trim();
  const time = String(req.body.time || '').trim();
  const location = String(req.body.location || '').trim();
  const details = String(req.body.details || '').trim();

  if (!course || !date || !time || !location) {
    return res.status(400).json({ error: 'course, date, time, and location are required.' });
  }
  if (course.length > MAX_SHORT_FIELD || location.length > MAX_SHORT_FIELD) {
    return res.status(400).json({ error: `course and location must be ${MAX_SHORT_FIELD} characters or fewer.` });
  }
  if (details.length > MAX_DETAILS) {
    return res.status(400).json({ error: `details must be ${MAX_DETAILS} characters or fewer.` });
  }

  const capacity = Math.min(MAX_CAPACITY, Math.max(MIN_CAPACITY, Number(req.body.capacity) || 4));

  const session = await createSession({
    course,
    date,
    time,
    location,
    capacity,
    details,
    host: toPublicUser(req.user),
  });

  res.status(201).json(withHost(session));
});

sessionsRouter.post('/:id/join', requireAuth, async (req, res) => {
  const session = await getSessionById(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }
  if (session.participants.length >= session.capacity) {
    return res.status(409).json({ error: 'That session is already full.' });
  }

  const updated = await addSessionParticipant(req.params.id, req.user.id);
  res.json(withHost(updated));
});
