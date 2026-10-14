import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import profilePlaceholder from './assets/placeholder.png';
import { useAuth } from './auth/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setIsMenuOpen(false);
    await logout();
    navigate('/login');
  }

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
        {user && (
          <div className={`user-menu${isMenuOpen ? ' is-open' : ''}`}>
            <button
              className="user-menu-trigger"
              type="button"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <img src={profilePlaceholder} alt={`Profile picture of ${user.name}`} />
              <span>{user.name}</span>
            </button>
            <div className="user-menu-panel">
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>My profile</NavLink>
              <button type="button" onClick={handleLogout}>Log out</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
