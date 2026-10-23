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
const CONVERSATIONS_KEY = 'campusconnect.conversations';

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

// Maps the free-text fields a user types on the Create Session form to the
// filter keys FindPartners searches on, so a newly created session actually
// shows up when someone filters by location, date, availability, or size.
function deriveLocationKey(location) {
  const text = location.toLowerCase();
  if (text.includes('librar')) return 'library';
  if (text.includes('life science')) return 'life-sciences';
  if (text.includes('commons')) return 'commons';
  return '';
}

function deriveDateKey(dateString) {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.getTime() === today.getTime()) return 'today';
  if (date.getTime() === tomorrow.getTime()) return 'tomorrow';
  if (date.toLocaleDateString('en-US', { weekday: 'long' }) === 'Thursday') return 'thursday';
  return '';
}

function deriveAvailability(timeString) {
  const hour = Number((timeString || '').split(':')[0]);
  return hour >= 17 ? 'evening' : 'afternoon';
}

function deriveSize(capacity) {
  if (capacity <= 4) return 'small';
  if (capacity <= 6) return 'medium';
  return 'large';
}

export function addSession({ course, date, time, location, capacity, details }, host) {
  const sessions = getSessions();
  const sessionCapacity = Number(capacity) || 4;
  const session = {
    id: nextSessionId++,
    course,
    date,
    time,
    location,
    capacity: sessionCapacity,
    details: details || '',
    participants: [],
    host: { username: host.username, name: host.name },
    subject: course.toLowerCase(),
    locationKey: deriveLocationKey(location),
    dateKey: deriveDateKey(date),
    style: '',
    availability: deriveAvailability(time),
    size: deriveSize(sessionCapacity),
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

// ---- chat ----
// Conversations persist the same way sessions do, so a message survives a
// reload instead of resetting to the seed data.

const seedConversations = {
  cs260: {
    title: 'CS 260 · Web Programming',
    time: 'Today, 6:30 PM · Harold B. Lee Library, Level 3',
    members: '3 members online',
    messages: [
      { id: 1, author: 'Jordan Lee', username: 'jordan-lee', text: 'Should we focus on the fetch API and WebSockets tonight?', you: false },
      { id: 2, author: 'Priya Shah', username: 'priya-shah', text: 'Yes, I can bring the practice problems from lecture.', you: false },
      { id: 3, author: 'You', text: 'Perfect. I will review the service endpoints before we meet.', you: true },
    ],
  },
  biology180: {
    title: 'Biology 180 · Exam review',
    time: 'Tomorrow, 4:00 PM · Life Sciences Building, Room 214',
    members: '2 members online',
    messages: [
      { id: 1, author: 'Maya Patel', username: 'maya-patel', text: 'I made a review list for cell structure and metabolism.', you: false },
    ],
  },
};

export function getConversations() {
  return readJSON(CONVERSATIONS_KEY, seedConversations);
}

function saveConversations(conversations) {
  writeJSON(CONVERSATIONS_KEY, conversations);
  return conversations;
}

export function sendMessage(conversationId, message) {
  const conversations = getConversations();
  const conversation = conversations[conversationId];
  const updated = {
    ...conversations,
    [conversationId]: { ...conversation, messages: [...conversation.messages, { id: Date.now(), ...message }] },
  };
  return saveConversations(updated);
}

const simulatedReplies = [
  { username: 'priya-shah', author: 'Priya Shah', text: "I'll grab a table near the entrance." },
  { username: 'jordan-lee', author: 'Jordan Lee', text: 'Running a few minutes late, start without me.' },
  { username: 'maya-patel', author: 'Maya Patel', text: 'Just posted the slides to the group folder.' },
];

export function startChatFeed(onUpdate) {
  const interval = setInterval(() => {
    const reply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];
    const updated = sendMessage('cs260', { ...reply, you: false });
    onUpdate(updated);
  }, 20000);

  return () => clearInterval(interval);
}
