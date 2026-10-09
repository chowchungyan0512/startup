import React from 'react';
import { Link } from 'react-router-dom';

export function StudySession() {
  return (
    <main className="form-page">
      <p className="eyebrow">Bring people together</p>
      <h1>Create a study session.</h1>
      <p className="muted">Give your classmates enough detail to know if this session is right for them.</p>

      <form className="session-form">
        <div className="form-grid">
          <div className="form-row full-width">
            <label htmlFor="course">Course or subject</label>
            <input className="form-control" id="course" name="course" type="text" placeholder="e.g. CS 260 · Web Programming" required />
          </div>
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input className="form-control" id="date" name="date" type="date" required />
          </div>
          <div className="form-row">
            <label htmlFor="time">Start time</label>
            <input className="form-control" id="time" name="time" type="time" required />
          </div>
          <div className="form-row">
            <label htmlFor="location">Location</label>
            <input className="form-control" id="location" name="location" type="text" placeholder="Library, room, or online" required />
          </div>
          <div className="form-row">
            <label htmlFor="capacity">Maximum participants</label>
            <input className="form-control" id="capacity" name="capacity" type="number" min="2" max="20" defaultValue={4} required />
          </div>
          <div className="form-row full-width">
            <label htmlFor="details">What will you work on?</label>
            <textarea className="form-control" id="details" name="details" rows="4" placeholder="Share topics, chapters, or goals for this session."></textarea>
          </div>
        </div>
        <div className="checkbox-row">
          <input className="form-check-input" id="chat" name="chat" type="checkbox" defaultChecked />
          <label htmlFor="chat">Create a group chat for this session</label>
        </div>
        <div className="service-note"><strong>Third-party service placeholder:</strong> A campus map API will validate this location and show directions to participants.</div>
        <div className="form-actions">
          <Link className="button button-light" to="/">Cancel</Link>
          <button className="button button-primary" type="submit">Publish</button>
        </div>
      </form>
    </main>
  );
}
