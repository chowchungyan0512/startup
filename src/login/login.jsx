import React from 'react';

export function Login() {
  return (
    <main>
      <section className="login-shell" aria-labelledby="login-title">
        <div className="login-intro">
          <p className="eyebrow">Study better, together</p>
          <h1 id="login-title">Find your people on campus.</h1>
          <p>CampusConnect helps students find classmates, build study groups, and make time to learn together.</p>
        </div>

        <form className="form-card">
          <h2>Welcome back</h2>
          <p className="muted">Log in to see your study sessions.</p>
          <div className="form-row">
            <label htmlFor="email">University email</label>
            <input className="form-control" id="email" name="email" type="email" placeholder="you@university.edu" autoComplete="username" required />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
          </div>
          <button className="button button-primary" type="submit">Log in</button>
          <p className="form-note">Login service placeholder: authentication will connect to the backend in a future deliverable.</p>
        </form>
      </section>
    </main>
  );
}
