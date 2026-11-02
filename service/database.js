import { MongoClient } from 'mongodb';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'dbConfig.json'), 'utf-8'));

const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('campusconnect');

export function getDb() {
  return db;
}

export async function connectToDatabase() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.error(`Error connecting to ${config.hostname} because ${ex.message}`);
    process.exit(1);
  }
}
