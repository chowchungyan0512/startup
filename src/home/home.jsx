import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SessionCard } from '../common/sessionCard';
import { useAuth } from '../auth/AuthContext';
import './home.css';

export function Home() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [joke, setJoke] = useState('');
  const [jokeStatus, setJokeStatus] = useState('');

  async function loadSessions() {
    try {
      const [allRes, mineRes] = await Promise.all([
        fetch('/api/sessions'),
        fetch('/api/sessions/mine'),
      ]);
      if (!allRes.ok || !mineRes.ok) throw new Error('Could not load sessions.');
      const [all, mine] = await Promise.all([allRes.json(), mineRes.json()]);
      setSessions(all);
      setMySessions(mine);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadSessions();
    fetch('/api/notifications')
      .then((response) => (response.ok ? response.json() : []))
      .then(setNotifications);
  }, []);

  // Calls our backend, which in turn calls a public third-party API
  // (icanhazdadjoke.com) server-side.
  function getStudyBreak() {
    setJokeStatus('Fetching...');
    fetch('/api/study-break')
      .then((response) => {
        if (!response.ok) throw new Error('Could not reach the joke service.');
        return response.json();
      })
      .then((data) => {
        setJoke(data.joke);
        setJokeStatus('');
      })
      .catch((err) => setJokeStatus(err.message));
  }

  async function handleJoin(sessionId) {
    const response = await fetch(`/api/sessions/${sessionId}/join`, { method: 'POST' });
    if (response.ok) {
      loadSessions();
    }
  }

  const joinedIds = new Set(mySessions.map((session) => session.id));
  const openSessions = sessions.filter((session) => !joinedIds.has(session.id));

  return (
    <main>
      <section className="dashboard-hero" aria-labelledby="welcome-title">
        <div>
          <p className="eyebrow">Your dashboard</p>
          <h1 id="welcome-title">Good morning, {user?.name ?? 'there'}.</h1>
          <p>Your next great study session is closer than you think.</p>
        </div>
      </section>

      <section aria-labelledby="tools-title">
        <p className="eyebrow">Your campus toolkit</p>
        <h2 id="tools-title">What are you working on?</h2>
        <div className="dashboard-grid">
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">⌕</div>
            <h3>Find a study partner</h3>
            <p>Browse classmates who are learning the same subjects and have open seats.</p>
            <Link to="/find-partners">Browse sessions →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">＋</div>
            <h3>Start a study session</h3>
            <p>Set the course, time, place, and group size. Your classmates can join.</p>
            <Link to="/study-session">Create a session →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">•••</div>
            <h3>Stay connected</h3>
            <p>Keep conversations with your study group in one focused place.</p>
            <Link to="/chat">Open group chat →</Link>
          </article>
        </div>
      </section>

      <section aria-labelledby="break-title">
        <div className="section-heading">
          <h2 id="break-title">Need a study break?</h2>
          <button className="button button-light" type="button" onClick={getStudyBreak}>Get a joke</button>
        </div>
        {jokeStatus && <p className="muted">{jokeStatus}</p>}
        {joke && <p className="data-note">{joke}</p>}
        <p className="data-note"><strong>Third-party call:</strong> The frontend calls our backend's /api/study-break, which calls icanhazdadjoke.com.</p>
      </section>

      <section id="sessions" aria-labelledby="sessions-title">
        <div className="section-heading">
          <h2 id="sessions-title">Open sessions near you</h2>
          <Link className="button button-light" to="/study-session">Create new</Link>
        </div>
        {error && <p className="data-note">{error}</p>}
        {!error && openSessions.length === 0 && <p className="muted">No open sessions yet. Be the first to create one.</p>}
        <div className="session-list">
          {openSessions.map((session) => (
            <SessionCard
              key={session.id}
              title={session.course}
              time={`${session.date} · ${session.time} · ${session.location}`}
              status={`${session.participants.length} / ${session.capacity} seats`}
              action={
                <button className="button button-primary" type="button" onClick={() => handleJoin(session.id)}>
                  Join session
                </button>
              }
            />
          ))}
        </div>
        <p className="data-note"><strong>Live data:</strong> These sessions are loaded from the CampusConnect backend at /api/sessions.</p>
      </section>

      <section aria-labelledby="joined-title">
        <div className="section-heading">
          <h2 id="joined-title">My sessions</h2>
          <Link className="button button-light" to="/chat">View all chats</Link>
        </div>
        {mySessions.length === 0 && <p className="muted">You haven't joined any sessions yet.</p>}
        <div className="session-list">
          {mySessions.map((session) => (
            <SessionCard
              key={session.id}
              title={session.course}
              time={`${session.date} · ${session.time} · ${session.location}`}
              host={{ username: session.host.username, name: session.host.name, note: '· hosting this session' }}
              joined
              action={<Link className="button button-light" to="/chat">Open chat</Link>}
            />
          ))}
        </div>
      </section>

      <section id="notifications" aria-labelledby="notifications-title">
        <div className="section-heading">
          <h2 id="notifications-title">Recent notifications</h2>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => (
            <article className="notification-item" key={notification.id}>
              <span className="notification-dot" aria-hidden="true"></span>
              <div>
                <p>{notification.message}</p>
                <p className="notification-time">{notification.minutesAgo} minutes ago</p>
              </div>
            </article>
          ))}
        </div>
        <p className="data-note"><strong>Live data:</strong> Loaded from /api/notifications; a future deliverable pushes these over WebSocket instead.</p>
      </section>
    </main>
  );
}
