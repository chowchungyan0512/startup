// MongoDB-backed data access. Replaces the earlier in-memory arrays now that
// the DB deliverable is done.

import { ObjectId } from 'mongodb';
import { getDb } from './database.js';

function usersCollection() {
  return getDb().collection('users');
}

function sessionsCollection() {
  return getDb().collection('sessions');
}

// Converts a MongoDB document's _id into a plain string `id` field, since
// that's what the frontend already expects from the old in-memory version.
function toRecord(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function createUser(user) {
  // insertOne mutates its argument by adding _id, so insert a copy and keep
  // the original clean for the response.
  const result = await usersCollection().insertOne({ ...user });
  return { id: result.insertedId.toString(), ...user };
}

export async function findUserByEmail(email) {
  const doc = await usersCollection().findOne({ email: new RegExp(`^${escapeRegex(email)}$`, 'i') });
  return toRecord(doc);
}

export async function findUserByUsername(username) {
  const doc = await usersCollection().findOne({ username });
  return toRecord(doc);
}

export async function findUserById(id) {
  try {
    const doc = await usersCollection().findOne({ _id: new ObjectId(id) });
    return toRecord(doc);
  } catch {
    return null;
  }
}

export async function updateUser(id, fields) {
  await usersCollection().updateOne({ _id: new ObjectId(id) }, { $set: fields });
  return findUserById(id);
}

export async function getSessions() {
  const docs = await sessionsCollection().find().toArray();
  return docs.map(toRecord);
}

export async function getSessionById(id) {
  try {
    const doc = await sessionsCollection().findOne({ _id: new ObjectId(id) });
    return toRecord(doc);
  } catch {
    return null;
  }
}

export async function createSession(session) {
  const record = { participants: [], ...session };
  const result = await sessionsCollection().insertOne({ ...record });
  return { id: result.insertedId.toString(), ...record };
}

export async function addSessionParticipant(id, userId) {
  await sessionsCollection().updateOne({ _id: new ObjectId(id) }, { $addToSet: { participants: userId } });
  return getSessionById(id);
}

export function toPublicUser(user) {
  if (!user) return null;
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
