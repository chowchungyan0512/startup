import React from 'react';
import { Link } from 'react-router-dom';
import './sessionCard.css';

export function SessionCard({ title, time, host, status, joined, action }) {
  return (
    <article className={`session-card${joined ? ' joined-card' : ''}`}>
      <div className="session-details">
        <h3>{title}</h3>
        <p>{time}</p>
        {host && (
          <p className="session-host">
            {host.label} <Link to={`/classmates/${host.username}`}>{host.name}</Link> <span>{host.note}</span>
          </p>
        )}
      </div>
      {status ? (
        <div className="session-meta">
          <span className="status">{status}</span>
          {action}
        </div>
      ) : (
        action
      )}
    </article>
  );
}
