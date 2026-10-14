// In-memory data store. This stands in for MongoDB until the DB deliverable,
// so data resets whenever the server restarts.

export const users = [];
export const sessions = [];
export const authTokens = new Map(); // token -> userId

let nextUserId = 1;
let nextSessionId = 1;

export function createUser(user) {
  const record = { id: nextUserId++, ...user };
  users.push(record);
  return record;
}

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function createSession(session) {
  const record = {
    id: nextSessionId++,
    participants: [],
    ...session,
  };
  sessions.push(record);
  return record;
}

export function toPublicUser(user) {
  if (!user) return null;
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
