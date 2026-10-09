import React from 'react';
import { Link } from 'react-router-dom';

export function Profile() {
  return (
    <main className="form-page">
      <p className="eyebrow">Your CampusConnect identity</p>
      <h1>Build your study profile.</h1>
      <p className="muted">Help classmates find you by sharing what you study and how you learn best.</p>

      <section className="profile-layout" aria-label="Student profile">
        <aside className="profile-summary">
          <img className="profile-avatar" src="/placeholder.png" alt="Placeholder profile image for Alex Morgan" />
          <div className="profile-summary-text">
            <h2>Alex Morgan</h2>
            <p>alex.morgan@university.edu</p>
            <p>Computer Science · Junior</p>
          </div>
        </aside>

        <form className="session-form profile-form">
          <div className="matching-note"><strong>Study matching:</strong> Your classes, availability, and study style will help CampusConnect suggest compatible partners.</div>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="full-name">Full name</label>
              <input className="form-control" id="full-name" name="full-name" type="text" defaultValue="Alex Morgan" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">University email</label>
              <input className="form-control" id="email" name="email" type="email" defaultValue="alex.morgan@university.edu" required />
            </div>
            <div className="form-row">
              <label htmlFor="major">Major</label>
              <input className="form-control" id="major" name="major" type="text" defaultValue="Computer Science" required />
            </div>
            <div className="form-row">
              <label htmlFor="year">Academic year</label>
              <select className="form-select" id="year" name="year" defaultValue="Junior">
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Graduate student</option>
              </select>
            </div>
            <div className="form-row full-width">
              <label htmlFor="classes">Current classes</label>
              <input className="form-control" id="classes" name="classes" type="text" defaultValue="CS 260, Biology 180, Spanish 201" required />
            </div>
            <div className="form-row">
              <label htmlFor="study-style">Preferred study style</label>
              <select className="form-select" id="study-style" name="study-style" defaultValue="Collaborative problem solving">
                <option>Collaborative problem solving</option>
                <option>Quiet individual study</option>
                <option>Flashcards and discussion</option>
                <option>Practice exams</option>
              </select>
            </div>
            <div className="form-row full-width">
              <fieldset className="availability-field">
                <legend>Typical availability</legend>
                <div className="table-scroll">
                  <table className="availability-table">
                    <thead>
                      <tr>
                        <th scope="col"><span className="visually-hidden">Day</span></th>
                        <th scope="col">Morning</th>
                        <th scope="col">Afternoon</th>
                        <th scope="col">Evening</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { day: 'Mon', evening: true },
                        { day: 'Tue', evening: true },
                        { day: 'Wed', evening: true },
                        { day: 'Thu', evening: true },
                        { day: 'Fri', evening: true },
                        { day: 'Sat', evening: false },
                        { day: 'Sun', evening: false },
                      ].map(({ day, evening }) => (
                        <tr key={day}>
                          <th scope="row">{day}</th>
                          <td><input type="checkbox" name="availability" aria-label={`${day} morning`} /></td>
                          <td><input type="checkbox" name="availability" aria-label={`${day} afternoon`} /></td>
                          <td><input type="checkbox" name="availability" aria-label={`${day} evening`} defaultChecked={evening} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </fieldset>
            </div>
            <div className="form-row full-width">
              <label htmlFor="bio">About your study goals</label>
              <textarea className="form-control" id="bio" name="bio" rows="4" defaultValue="I am preparing for upcoming exams and enjoy working through practice problems with a small group."></textarea>
            </div>
          </div>
          <div className="form-actions">
            <Link className="button button-light" to="/">Cancel</Link>
            <button className="button button-primary" type="submit">Save profile</button>
          </div>
          <div className="service-note"><strong>Third-party service placeholder:</strong> A calendar API will sync your availability and joined sessions with your personal calendar.</div>
          <p className="form-note">Profile database placeholder: saved information will be stored with your account in a future deliverable.</p>
        </form>
      </section>
    </main>
  );
}
