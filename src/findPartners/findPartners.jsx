import React from 'react';
import { Link } from 'react-router-dom';

export function FindPartners() {
  return (
    <main>
      <section aria-labelledby="find-title">
        <p className="eyebrow">Meet your next study partner</p>
        <h1 id="find-title">Find people learning what you are.</h1>
        <p className="muted">Search open sessions by class, then narrow the results to fit your schedule and study style.</p>
      </section>

      <section className="search-panel" aria-labelledby="search-title">
        <h2 id="search-title">Search sessions</h2>
        <div className="search-row">
          <div className="form-row">
            <label htmlFor="partner-search">Class or subject</label>
            <input className="form-control" id="partner-search" type="search" placeholder="Try CS 260 or Biology" autoComplete="off" />
          </div>
          <div className="form-row">
            <label htmlFor="quick-location">Quick location</label>
            <select className="form-select" id="quick-location">
              <option value="">Any location</option>
              <option value="library">Library</option>
              <option value="life-sciences">Life Sciences</option>
              <option value="commons">The Commons</option>
            </select>
          </div>
          <button className="button button-primary" id="filter-toggle" type="button" aria-expanded="false" aria-controls="advanced-filters">More filters</button>
        </div>
        <div className="advanced-filters" id="advanced-filters">
          <div className="form-row">
            <label htmlFor="date-filter">Date</label>
            <select className="form-select" id="date-filter">
              <option value="">Any date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="thursday">Thursday</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="style-filter">Study style</label>
            <select className="form-select" id="style-filter">
              <option value="">Any study style</option>
              <option value="problem-solving">Problem solving</option>
              <option value="discussion">Discussion</option>
              <option value="practice">Practice exams</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="availability-filter">Availability</label>
            <select className="form-select" id="availability-filter">
              <option value="">Any availability</option>
              <option value="evening">Evening</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="size-filter">Group size</label>
            <select className="form-select" id="size-filter">
              <option value="">Any group size</option>
              <option value="small">2–4 students</option>
              <option value="medium">5–6 students</option>
              <option value="large">7+ students</option>
            </select>
          </div>
        </div>
      </section>

      <section aria-labelledby="results-title">
        <div className="results-heading">
          <h2 id="results-title">Open sessions</h2>
          <span className="results-count">3 sessions found</span>
        </div>
        <div className="session-list">
          <article className="session-card">
            <div className="session-details">
              <h3>CS 260 · Web Programming</h3>
              <p>Today, 6:30 PM · Harold B. Lee Library, Level 3</p>
              <p className="session-host">Hosted by <Link to="/classmates/jordan-lee">Jordan Lee</Link> <span>· Shares CS 260 with you</span></p>
            </div>
            <div className="session-meta">
              <span className="status">3 / 6 seats</span>
              <button className="button button-primary" type="button">Join session</button>
            </div>
          </article>
          <article className="session-card">
            <div className="session-details">
              <h3>Biology 180 · Exam review</h3>
              <p>Tomorrow, 4:00 PM · Life Sciences Building, Room 214</p>
              <p className="session-host">Hosted by <Link to="/classmates/jordan-lee">Maya Patel</Link> <span>· Shares Biology 180 with you</span></p>
            </div>
            <div className="session-meta">
              <span className="status">2 / 4 seats</span>
              <button className="button button-primary" type="button">Join session</button>
            </div>
          </article>
          <article className="session-card">
            <div className="session-details">
              <h3>Spanish 201 · Conversation practice</h3>
              <p>Thursday, 7:00 PM · The Commons, Table 8</p>
              <p className="session-host">Hosted by <Link to="/classmates/jordan-lee">Elena Garcia</Link> <span>· Shares Spanish 201 with you</span></p>
            </div>
            <div className="session-meta">
              <span className="status">4 / 8 seats</span>
              <button className="button button-primary" type="button">Join session</button>
            </div>
          </article>
        </div>
        <p className="data-note"><strong>Database placeholder:</strong> These session and host records will eventually come from CampusConnect's database.</p>
      </section>
    </main>
  );
}
