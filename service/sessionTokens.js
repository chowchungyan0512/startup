// Ephemeral cookie-session tokens (token -> userId). These aren't
// application data, just short-lived login state, so they stay in memory
// rather than in MongoDB; logging in again after a restart is fine.
export const authTokens = new Map();
