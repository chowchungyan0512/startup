import React from 'react';
import { Link } from 'react-router-dom';
import { SessionCard } from '../common/sessionCard';
import './home.css';

export function Home() {
  return (
    <main>
      <section className="dashboard-hero" aria-labelledby="welcome-title">
        <div>
          <p className="eyebrow">Tuesday, September 16</p>
          <h1 id="welcome-title">Good morning, Alex.</h1>
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
        <div className="session-list">
          <SessionCard
            title="Spanish 201 · Conversation practice"
            time="Thursday, 7:00 PM · The Commons, Table 8"
            status="4 / 8 seats"
            action={<button className="button button-primary" type="button">Join session</button>}
          />
          <SessionCard
            title="Math 112 · Calculus problem set"
            time="Friday, 2:00 PM · Talmage Math Sciences, Room 105"
            status="3 / 5 seats"
            action={<button className="button button-primary" type="button">Join session</button>}
          />
          <SessionCard
            title="Chem 106 · Lab prep"
            time="Saturday, 11:00 AM · Benson Building, Room 220"
            status="1 / 4 seats"
            action={<button className="button button-primary" type="button">Join session</button>}
          />
        </div>
        <p className="data-note"><strong>Database placeholder:</strong> These session cards represent study-session records that will be loaded from the CampusConnect database.</p>
      </section>

      <section aria-labelledby="joined-title">
        <div className="section-heading">
          <h2 id="joined-title">My sessions</h2>
          <Link className="button button-light" to="/chat">View all chats</Link>
        </div>
        <div className="session-list">
          <SessionCard
            title="CS 260 · Web Programming"
            time="Today, 6:30 PM · Harold B. Lee Library, Level 3"
            host={{ username: 'jordan-lee', name: 'Jordan Lee', note: 'and 2 other classmates' }}
            joined
            action={<Link className="button button-light" to="/chat">Open chat</Link>}
          />
          <SessionCard
            title="Biology 180 · Exam review"
            time="Tomorrow, 4:00 PM · Life Sciences Building, Room 214"
            host={{ username: 'maya-patel', name: 'Maya Patel', note: 'and 1 other classmate' }}
            joined
            action={<Link className="button button-light" to="/chat">Open chat</Link>}
          />
        </div>
      </section>

      <section id="notifications" aria-labelledby="notifications-title">
        <div className="section-heading">
          <h2 id="notifications-title">Recent notifications</h2>
        </div>
        <div className="notification-list">
          <article className="notification-item">
            <span className="notification-dot" aria-hidden="true"></span>
            <div>
              <p><strong>Jordan Lee</strong> joined your CS 260 · Web Programming session.</p>
              <p className="notification-time">2 minutes ago</p>
            </div>
          </article>
          <article className="notification-item">
            <span className="notification-dot" aria-hidden="true"></span>
            <div>
              <p><strong>Maya Patel</strong> sent a message in Biology 180 · Exam review.</p>
              <p className="notification-time">18 minutes ago</p>
            </div>
          </article>
          <article className="notification-item">
            <span className="notification-dot" aria-hidden="true"></span>
            <div>
              <p>Your <strong>Spanish 201 · Conversation practice</strong> session starts in 2 days.</p>
              <p className="notification-time">1 hour ago</p>
            </div>
          </article>
        </div>
        <p className="data-note"><strong>Real-time placeholder:</strong> These notifications will update live over a WebSocket connection once the service layer is built.</p>
      </section>
    </main>
  );
}
