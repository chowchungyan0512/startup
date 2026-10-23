// Mock data service for the React Part 2: Reactivity deliverable.
//
// There is no backend yet for this deliverable, so every "service call" in
// the app is stubbed out here using the browser's localStorage, exactly as
// suggested in the course instructions. Each function is written the way a
// real fetch-based API call will look later, so swapping this module for
// real network calls (the Service deliverable) should mean changing very
// little of the component code that calls it.

const USERS_KEY = 'campusconnect.users';
const CURRENT_USER_KEY = 'campusconnect.currentUser';
const SESSIONS_KEY = 'campusconnect.sessions';
const NOTIFICATIONS_KEY = 'campusconnect.notifications';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let nextSessionId = 100;

const seedSessions = [
  {
    id: 1,
    course: 'CS 260 · Web Programming',
    date: 'Today',
    time: '6:30 PM',
    location: 'Harold B. Lee Library, Level 3',
    capacity: 6,
    details: '',
    participants: [],
    host: { username: 'jordan-lee', name: 'Jordan Lee' },
    subject: 'computer science',
    locationKey: 'library',
    dateKey: 'today',
    style: 'problem-solving',
    availability: 'evening',
    size: 'medium',
  },
  {
    id: 2,
    course: 'Biology 180 · Exam review',
    date: 'Tomorrow',
    time: '4:00 PM',
    location: 'Life Sciences Building, Room 214',
    capacity: 4,
    details: '',
    participants: [],
    host: { username: 'maya-patel', name: 'Maya Patel' },
    subject: 'biology',
    locationKey: 'life-sciences',
    dateKey: 'tomorrow',
    style: 'practice',
    availability: 'afternoon',
    size: 'small',
  },
  {
    id: 3,
    course: 'Spanish 201 · Conversation practice',
    date: 'Thursday',
    time: '7:00 PM',
    location: 'The Commons, Table 8',
    capacity: 8,
    details: '',
    participants: [],
    host: { username: 'elena-garcia', name: 'Elena Garcia' },
    subject: 'spanish',
    locationKey: 'commons',
    dateKey: 'thursday',
    style: 'discussion',
    availability: 'evening',
    size: 'large',
  },
  {
    id: 4,
    course: 'Math 112 · Calculus problem set',
    date: 'Friday',
    time: '2:00 PM',
    location: 'Talmage Math Sciences, Room 105',
    capacity: 5,
    details: '',
    participants: [],
    host: { username: 'priya-shah', name: 'Priya Shah' },
    subject: 'math',
    locationKey: 'library',
    dateKey: 'thursday',
    style: 'problem-solving',
    availability: 'afternoon',
    size: 'medium',
  },
];

const seedNotifications = [
  { id: 1, message: 'Jordan Lee joined your CS 260 · Web Programming session.', minutesAgo: 2 },
  { id: 2, message: 'Maya Patel sent a message in Biology 180 · Exam review.', minutesAgo: 18 },
];

// ---- auth ----

export function getCurrentUser() {
  return readJSON(CURRENT_USER_KEY, null);
}

function setCurrentUser(user) {
  writeJSON(CURRENT_USER_KEY, user);
  return user;
}

export function registerUser({ email, password, name }) {
  const users = readJSON(USERS_KEY, []);
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with that email already exists.');
  }

  const user = {
    id: Date.now(),
    email,
    password,
    name,
    username: email.split('@')[0].toLowerCase(),
    major: '',
    year: 'Freshman',
    classes: '',
    studyStyle: 'Collaborative problem solving',
    bio: '',
  };
  writeJSON(USERS_KEY, [...users, user]);
  return setCurrentUser(user);
}

export function loginUser(email, password) {
  const users = readJSON(USERS_KEY, []);
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || user.password !== password) {
    throw new Error('Incorrect email or password.');
  }
  return setCurrentUser(user);
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateCurrentUser(fields) {
  const current = getCurrentUser();
  if (!current) return null;

  const updated = { ...current, ...fields };
  const users = readJSON(USERS_KEY, []).map((u) => (u.id === current.id ? updated : u));
  writeJSON(USERS_KEY, users);
  return setCurrentUser(updated);
}

// ---- study sessions ----

export function getSessions() {
  return readJSON(SESSIONS_KEY, seedSessions);
}

function saveSessions(sessions) {
  writeJSON(SESSIONS_KEY, sessions);
  return sessions;
}

export function addSession({ course, date, time, location, capacity, details }, host) {
  const sessions = getSessions();
  const session = {
    id: nextSessionId++,
    course,
    date,
    time,
    location,
    capacity: Number(capacity) || 4,
    details: details || '',
    participants: [],
    host: { username: host.username, name: host.name },
    subject: course.toLowerCase(),
    locationKey: '',
    dateKey: '',
    style: '',
    availability: '',
    size: '',
  };
  return saveSessions([...sessions, session]);
}

export function joinSession(sessionId, userId) {
  const sessions = getSessions().map((session) => {
    if (session.id !== sessionId) return session;
    if (session.participants.includes(userId)) return session;
    if (session.participants.length >= session.capacity) {
      throw new Error('That session is already full.');
    }
    return { ...session, participants: [...session.participants, userId] };
  });
  return saveSessions(sessions);
}

// ---- notifications ----
// A real version of this list will be pushed over WebSocket. Until then,
// getNotifications seeds a starting list, and startNotificationFeed uses
// setInterval to simulate new notifications arriving over time, the same
// pattern the course instructions suggest for mocking push-style data.

export function getNotifications() {
  return readJSON(NOTIFICATIONS_KEY, seedNotifications);
}

function saveNotifications(notifications) {
  writeJSON(NOTIFICATIONS_KEY, notifications);
  return notifications;
}

const simulatedNotifications = [
  'Elena Garcia opened a new Spanish 201 session near you.',
  'Priya Shah joined your Math 112 session.',
  'A classmate in CS 260 just sent a new chat message.',
];

export function startNotificationFeed(onUpdate) {
  const interval = setInterval(() => {
    const message = simulatedNotifications[Math.floor(Math.random() * simulatedNotifications.length)];
    const notifications = getNotifications();
    const updated = [{ id: Date.now(), message, minutesAgo: 0 }, ...notifications].slice(0, 6);
    saveNotifications(updated);
    onUpdate(updated);
  }, 15000);

  return () => clearInterval(interval);
}
