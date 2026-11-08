import { MongoClient } from 'mongodb';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db;
let hostname;

export function getDb() {
  return db;
}

export async function connectToDatabase() {
  const configText = await fs.readFile(path.join(__dirname, 'dbConfig.json'), 'utf-8');
  const config = JSON.parse(configText);
  hostname = config.hostname;

  const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;
  const client = new MongoClient(url);
  db = client.db('campusconnect');

  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${hostname}`);
  } catch (ex) {
    console.error(`Error connecting to ${hostname} because ${ex.message}`);
    process.exit(1);
  }
}
