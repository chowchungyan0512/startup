import React from 'react';
import { Link, useParams } from 'react-router-dom';

const classmates = {
  'jordan-lee': {
    name: 'Jordan Lee',
    email: 'jordan.lee@university.edu',
    major: 'Computer Science',
    year: 'Senior',
    classes: 'CS 260, Math 112, Chem 106',
    sharedClass: 'CS 260',
    style: 'Collaborative problem solving',
    availability: 'Weekday evenings',
    about: 'I like hosting review sessions before exams and going through practice problems as a group.',
  },
  'maya-patel': {
    name: 'Maya Patel',
    email: 'maya.patel@university.edu',
    major: 'Biology',
    year: 'Sophomore',
    classes: 'Biology 180, Chem 106, Math 112',
    sharedClass: 'Biology 180',
    style: 'Flashcards and discussion',
    availability: 'Weekday afternoons',
    about: 'I am prepping for exams and like to make review sheets the group can share.',
  },
  'elena-garcia': {
    name: 'Elena Garcia',
    email: 'elena.garcia@university.edu',
    major: 'Spanish',
    year: 'Junior',
    classes: 'Spanish 201, CS 260',
    sharedClass: 'Spanish 201',
    style: 'Discussion',
    availability: 'Weekday evenings',
    about: 'I host conversation practice sessions and love meeting at The Commons.',
  },
  'priya-shah': {
    name: 'Priya Shah',
    email: 'priya.shah@university.edu',
    major: 'Computer Science',
    year: 'Senior',
    classes: 'CS 260, Math 112',
    sharedClass: 'CS 260',
    style: 'Practice exams',
    availability: 'Weekday evenings',
    about: 'I bring practice problems from lecture and like working through them as a group.',
  },
};

export function OtherProfile() {
  const { username } = useParams();
  const classmate = classmates[username] ?? classmates['jordan-lee'];

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
