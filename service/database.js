import { MongoClient } from 'mongodb';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db;
let hostname;

export function getDb() {
  if (!db) {
    throw new Error('Database not connected yet - connectToDatabase() must complete before any route handles a request.');
  }
  return db;
}

export async function connectToDatabase() {
  const configText = await fs.readFile(path.join(__dirname, 'dbConfig.json'), 'utf-8');
  const config = JSON.parse(configText);
  hostname = config.hostname;

  const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;
  const client = new MongoClient(url);
  // dbName lets a test run point at a separate database (e.g. "campusconnect-test")
  // without touching production data, while defaulting to "campusconnect".
  db = client.db(config.dbName || 'campusconnect');

  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${hostname}`);
    await ensureIndexes();
  } catch (ex) {
    console.error(`Error connecting to ${hostname} because ${ex.message}`);
    process.exit(1);
  }
}

// Unique indexes both prevent duplicate accounts at the database level (a
// second safeguard behind the findUserByEmail check) and keep lookups fast
// as the users collection grows, instead of a full collection scan.
async function ensureIndexes() {
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('users').createIndex({ username: 1 }, { unique: true });
}
