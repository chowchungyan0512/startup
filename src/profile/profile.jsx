import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../common/profileLayout.css';
import './profile.css';
import profilePlaceholder from '../assets/placeholder.png';
import { useAuth } from '../auth/AuthContext';
import * as store from '../mock/store';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timesOfDay = ['morning', 'afternoon', 'evening'];

const defaultAvailability = days.reduce((acc, day) => {
  acc[day] = { morning: false, afternoon: false, evening: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) };
  return acc;
}, {});

export function Profile() {
  const { user, setUser } = useAuth();
  const [major, setMajor] = useState(user?.major ?? '');
  const [year, setYear] = useState(user?.year ?? 'Freshman');
  const [classes, setClasses] = useState(user?.classes ?? '');
  const [studyStyle, setStudyStyle] = useState(user?.studyStyle ?? 'Collaborative problem solving');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [availability, setAvailability] = useState(user?.availability ?? defaultAvailability);
  const [status, setStatus] = useState('');

  function toggleAvailability(day, timeOfDay) {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [timeOfDay]: !prev[day][timeOfDay] },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updated = store.updateCurrentUser({ major, year, classes, studyStyle, bio, availability });
    setUser(updated);
    setStatus('Saved!');
  }

  return (
    <main className="form-page">
      <p className="eyebrow">Your CampusConnect identity</p>
      <h1>Build your study profile.</h1>
      <p className="muted">Help classmates find you by sharing what you study and how you learn best.</p>

      <section className="profile-layout" aria-label="Student profile">
        <aside className="profile-summary">
          <img className="profile-avatar" src={profilePlaceholder} alt={`Placeholder profile image for ${user?.name}`} />
          <div className="profile-summary-text">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <p>{major || 'No major set'} · {year}</p>
          </div>
        </aside>

        <form className="session-form profile-form" onSubmit={handleSubmit}>
          <div className="matching-note"><strong>Study matching:</strong> Your classes, availability, and study style will help CampusConnect suggest compatible partners.</div>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="major">Major</label>
              <input className="form-control" id="major" value={major} onChange={(e) => setMajor(e.target.value)} required />
            </div>
            <div className="form-row">
              <label htmlFor="year">Academic year</label>
              <select className="form-select" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Graduate student</option>
              </select>
            </div>
            <div className="form-row full-width">
              <label htmlFor="classes">Current classes</label>
              <input className="form-control" id="classes" value={classes} onChange={(e) => setClasses(e.target.value)} placeholder="CS 260, Biology 180" required />
            </div>
            <div className="form-row">
              <label htmlFor="study-style">Preferred study style</label>
              <select className="form-select" id="study-style" value={studyStyle} onChange={(e) => setStudyStyle(e.target.value)}>
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
                      {days.map((day) => (
                        <tr key={day}>
                          <th scope="row">{day}</th>
                          {timesOfDay.map((timeOfDay) => (
                            <td key={timeOfDay}>
                              <input
                                type="checkbox"
                                aria-label={`${day} ${timeOfDay}`}
                                checked={availability[day][timeOfDay]}
                                onChange={() => toggleAvailability(day, timeOfDay)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </fieldset>
            </div>
            <div className="form-row full-width">
              <label htmlFor="bio">About your study goals</label>
              <textarea className="form-control" id="bio" rows="4" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
          </div>
          <div className="form-actions">
            <Link className="button button-light" to="/">Cancel</Link>
            <button className="button button-primary" type="submit">Save profile</button>
          </div>
          <div className="service-note"><strong>Third-party service placeholder:</strong> A calendar API will sync your availability and joined sessions with your personal calendar.</div>
          <p className="form-note">{status || 'Mocked data: saved to localStorage until the Service deliverable.'}</p>
        </form>
      </section>
    </main>
  );
}
