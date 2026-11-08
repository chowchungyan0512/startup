// Mock data for group chat only. There's no chat service endpoint yet (that
// arrives with the WebSocket deliverable), so conversations still live in
// localStorage, wrapped the same way the rest of the app's real service
// calls are shaped, so swapping this out later should be a small change.

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
