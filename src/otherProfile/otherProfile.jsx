import React from 'react';
import { Link } from 'react-router-dom';

export function OtherProfile() {
  return (
    <main className="form-page">
      <p className="eyebrow">Classmate profile</p>
      <h1>Jordan Lee</h1>
      <p className="muted">Shares CS 260 with you and hosts study sessions on campus.</p>

      <section className="profile-layout" aria-label="Classmate profile">
        <aside className="profile-summary">
          <img className="profile-avatar" src="/placeholder.png" alt="Placeholder profile image for Jordan Lee" />
          <div className="profile-summary-text">
            <h2>Jordan Lee</h2>
            <p>jordan.lee@university.edu</p>
            <p>Computer Science · Senior</p>
          </div>
        </aside>

        <div className="session-form profile-form">
          <div className="matching-note"><strong>Classmate directory placeholder:</strong> This read-only view will show each classmate's real profile once CampusConnect is connected to the database.</div>
          <div className="form-grid">
            <div className="form-row">
              <label>Major</label>
              <p>Computer Science</p>
            </div>
            <div className="form-row">
              <label>Academic year</label>
              <p>Senior</p>
            </div>
            <div className="form-row full-width">
              <label>Current classes</label>
              <p>CS 260, Math 112, Chem 106</p>
            </div>
            <div className="form-row">
              <label>Preferred study style</label>
              <p>Collaborative problem solving</p>
            </div>
            <div className="form-row">
              <label>Typical availability</label>
              <p>Weekday evenings</p>
            </div>
            <div className="form-row full-width">
              <label>About</label>
              <p>I like hosting review sessions before exams and going through practice problems as a group.</p>
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
