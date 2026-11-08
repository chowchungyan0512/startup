// Cookie-session tokens (token -> userId), persisted in MongoDB so logins
// survive a server restart instead of resetting like an in-memory Map would.
import { getDb } from './database.js';

function tokensCollection() {
  return getDb().collection('authTokens');
}

export async function createToken(token, userId) {
  await tokensCollection().insertOne({ token, userId });
}

export async function findUserIdByToken(token) {
  if (!token) return null;
  const doc = await tokensCollection().findOne({ token });
  return doc ? doc.userId : null;
}

export async function deleteToken(token) {
  await tokensCollection().deleteOne({ token });
}
