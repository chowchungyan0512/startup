import React, { useMemo, useState } from 'react';
import { SessionCard } from '../common/sessionCard';
import { useAuth } from '../auth/AuthContext';
import * as store from '../mock/store';
import './findPartners.css';

export function FindPartners() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState(() => store.getSessions());
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [date, setDate] = useState('');
  const [style, setStyle] = useState('');
  const [availability, setAvailability] = useState('');
  const [size, setSize] = useState('');
  const [joinError, setJoinError] = useState('');

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return sessions.filter((session) => {
      const matchesSearch = !term || session.course.toLowerCase().includes(term) || session.subject.includes(term);
      const matchesLocation = !location || session.locationKey === location;
      const matchesDate = !date || session.dateKey === date;
      const matchesStyle = !style || session.style === style;
      const matchesAvailability = !availability || session.availability === availability;
      const matchesSize = !size || session.size === size;
      return matchesSearch && matchesLocation && matchesDate && matchesStyle && matchesAvailability && matchesSize;
    });
  }, [sessions, searchTerm, location, date, style, availability, size]);

  function handleJoin(sessionId) {
    try {
      setJoinError('');
      setSessions(store.joinSession(sessionId, user.id));
    } catch (err) {
      setJoinError(err.message);
    }
  }

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
            <input
              className="form-control"
              id="partner-search"
              type="search"
              placeholder="Try CS 260 or Biology"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="quick-location">Quick location</label>
            <select className="form-select" id="quick-location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Any location</option>
              <option value="library">Library</option>
              <option value="life-sciences">Life Sciences</option>
              <option value="commons">The Commons</option>
            </select>
          </div>
          <button
            className="button button-primary"
            id="filter-toggle"
            type="button"
            aria-expanded={showAdvanced}
            aria-controls="advanced-filters"
            onClick={() => setShowAdvanced((show) => !show)}
          >
            More filters
          </button>
        </div>
        {showAdvanced && (
          <div className="advanced-filters is-visible" id="advanced-filters">
            <div className="form-row">
              <label htmlFor="date-filter">Date</label>
              <select className="form-select" id="date-filter" value={date} onChange={(e) => setDate(e.target.value)}>
                <option value="">Any date</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="thursday">Thursday</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="style-filter">Study style</label>
              <select className="form-select" id="style-filter" value={style} onChange={(e) => setStyle(e.target.value)}>
                <option value="">Any study style</option>
                <option value="problem-solving">Problem solving</option>
                <option value="discussion">Discussion</option>
                <option value="practice">Practice exams</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="availability-filter">Availability</label>
              <select className="form-select" id="availability-filter" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="">Any availability</option>
                <option value="evening">Evening</option>
                <option value="afternoon">Afternoon</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="size-filter">Group size</label>
              <select className="form-select" id="size-filter" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Any group size</option>
                <option value="small">2–4 students</option>
                <option value="medium">5–6 students</option>
                <option value="large">7+ students</option>
              </select>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="results-title">
        <div className="results-heading">
          <h2 id="results-title">Open sessions</h2>
          <span className="results-count">{results.length} session{results.length === 1 ? '' : 's'} found</span>
        </div>
        {joinError && <p className="data-note">{joinError}</p>}
        {results.length === 0 ? (
          <p className="empty-results is-visible">No sessions match those filters. Try another class or broaden your search.</p>
        ) : (
          <div className="session-list">
            {results.map((session) => (
              <SessionCard
                key={session.id}
                title={session.course}
                time={`${session.date}, ${session.time} · ${session.location}`}
                host={{ username: session.host.username, name: session.host.name, label: 'Hosted by', note: '' }}
                status={`${session.participants.length} / ${session.capacity} seats`}
                action={
                  <button className="button button-primary" type="button" onClick={() => handleJoin(session.id)}>
                    Join session
                  </button>
                }
              />
            ))}
          </div>
        )}
        <p className="data-note"><strong>Mocked data:</strong> Sessions are stored in localStorage until the Service deliverable adds a real backend.</p>
      </section>
    </main>
  );
}
