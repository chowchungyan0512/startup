import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import profilePlaceholder from './assets/placeholder.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <span className="brand-mark">+</span> CampusConnect
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/find-partners">Find partners</NavLink>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/study-session">Create a session</NavLink>
        <div className={`user-menu${isMenuOpen ? ' is-open' : ''}`}>
          <button
            className="user-menu-trigger"
            type="button"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <img src={profilePlaceholder} alt="Profile picture of Alex Morgan" />
            <span>Alex Morgan</span>
          </button>
          <div className="user-menu-panel">
            <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>My profile</NavLink>
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log out</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
