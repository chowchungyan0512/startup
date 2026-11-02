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

sessionsRouter.post('/', requireAuth, async (req, res) => {
  const { course, date, time, location, capacity, details } = req.body;
  if (!course || !date || !time || !location) {
    return res.status(400).json({ error: 'course, date, time, and location are required.' });
  }

  const session = await createSession({
    course,
    date,
    time,
    location,
    capacity: Number(capacity) || 4,
    details: details || '',
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
