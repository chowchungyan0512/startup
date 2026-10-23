import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SessionCard } from '../common/sessionCard';
import { useAuth } from '../auth/AuthContext';
import * as store from '../mock/store';
import './home.css';

export function Home() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState(() => store.getSessions());
  const [notifications, setNotifications] = useState(() => store.getNotifications());
  const [joinError, setJoinError] = useState('');

  // Simulates notifications that will eventually arrive over WebSocket.
  useEffect(() => {
    return store.startNotificationFeed(setNotifications);
  }, []);

  function handleJoin(sessionId) {
    try {
      setJoinError('');
      setSessions(store.joinSession(sessionId, user.id));
    } catch (err) {
      setJoinError(err.message);
    }
  }

  const mySessions = sessions.filter((session) => session.participants.includes(user.id));
  const openSessions = sessions.filter((session) => !session.participants.includes(user.id));

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

      <section id="sessions" aria-labelledby="sessions-title">
        <div className="section-heading">
          <h2 id="sessions-title">Open sessions near you</h2>
          <Link className="button button-light" to="/study-session">Create new</Link>
        </div>
        {joinError && <p className="data-note">{joinError}</p>}
        {openSessions.length === 0 && <p className="muted">No open sessions yet. Be the first to create one.</p>}
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
        <p className="data-note"><strong>Mocked data:</strong> Sessions are stored in localStorage until the Service deliverable adds a real backend.</p>
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
                <p className="notification-time">{notification.minutesAgo === 0 ? 'Just now' : `${notification.minutesAgo} minutes ago`}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="data-note"><strong>WebSocket placeholder:</strong> New notifications are simulated here with setInterval until a real WebSocket connection replaces it.</p>
      </section>
    </main>
  );
}
