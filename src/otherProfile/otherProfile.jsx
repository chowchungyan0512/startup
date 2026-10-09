import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../common/profileLayout.css';
import { mockClassmates } from '../data/mockClassmates';

export function OtherProfile() {
  const { username } = useParams();
  const classmate = mockClassmates[username] ?? mockClassmates['jordan-lee'];

  return (
    <main className="form-page">
      <p className="eyebrow">Classmate profile</p>
      <h1>{classmate.name}</h1>
      <p className="muted">Shares {classmate.sharedClass} with you and hosts study sessions on campus.</p>

      <section className="profile-layout" aria-label="Classmate profile">
        <aside className="profile-summary">
          <img className="profile-avatar" src="/placeholder.png" alt={`Placeholder profile image for ${classmate.name}`} />
          <div className="profile-summary-text">
            <h2>{classmate.name}</h2>
            <p>{classmate.email}</p>
            <p>{classmate.major} · {classmate.year}</p>
          </div>
        </aside>

        <div className="session-form profile-form">
          <div className="matching-note"><strong>Classmate directory placeholder:</strong> This read-only view will show each classmate's real profile once CampusConnect is connected to the database.</div>
          <div className="form-grid">
            <div className="form-row">
              <label>Major</label>
              <p>{classmate.major}</p>
            </div>
            <div className="form-row">
              <label>Academic year</label>
              <p>{classmate.year}</p>
            </div>
            <div className="form-row full-width">
              <label>Current classes</label>
              <p>{classmate.classes}</p>
            </div>
            <div className="form-row">
              <label>Preferred study style</label>
              <p>{classmate.style}</p>
            </div>
            <div className="form-row">
              <label>Typical availability</label>
              <p>{classmate.availability}</p>
            </div>
            <div className="form-row full-width">
              <label>About</label>
              <p>{classmate.about}</p>
            </div>
          </div>
          <div className="form-actions">
            <Link className="button button-light" to="/find-partners">Back to sessions</Link>
            <Link className="button button-primary" to="/chat">Message in chat</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
