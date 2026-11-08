import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { attachUser } from './middleware/auth.js';
import { authRouter } from './routes/auth.js';
import { sessionsRouter } from './routes/sessions.js';
import { profileRouter } from './routes/profile.js';
import { miscRouter } from './routes/misc.js';
import { connectToDatabase } from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.argv[2] || process.env.PORT || 4000;

await connectToDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/profile', profileRouter);
app.use('/api', miscRouter);

// Serve the built React frontend. deployService.sh copies the Vite build
// into a "public" folder alongside this file in production; locally, this
// path is only exercised if you build the frontend into service/public
// yourself (normal local dev uses `npm run dev`'s proxy instead).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`CampusConnect service listening on port ${port}`);
});
