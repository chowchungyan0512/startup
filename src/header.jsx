import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
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
        <div className="user-menu">
          <button className="user-menu-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            <img src="/placeholder.png" alt="Profile picture of Alex Morgan" />
            <span>Alex Morgan</span>
          </button>
          <div className="user-menu-panel">
            <NavLink to="/profile">My profile</NavLink>
            <NavLink to="/login">Log out</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
