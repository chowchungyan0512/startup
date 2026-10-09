import React from 'react';
import { Link } from 'react-router-dom';
import './chat.css';

export function Chat() {
  return (
    <main>
      <section aria-labelledby="chat-title">
        <p className="eyebrow">Study together, wherever you are</p>
        <h1 id="chat-title">Group chat.</h1>
        <p className="muted">Coordinate your next session and keep the conversation in one place.</p>
      </section>

      <section className="chat-layout" aria-label="Study group conversations">
        <div className="chat-tabs" role="tablist" aria-label="Joined study sessions">
          <button className="chat-tab is-active" type="button" role="tab" aria-selected="true">
            <strong>CS 260</strong><span>3 members online</span>
          </button>
          <button className="chat-tab" type="button" role="tab" aria-selected="false">
            <strong>Biology 180</strong><span>2 members online</span>
          </button>
        </div>

        <div className="chat-window">
          <header className="chat-window-header">
            <h2>CS 260 · Web Programming</h2>
            <p>Today, 6:30 PM · Harold B. Lee Library, Level 3</p>
          </header>
          <div className="chat-messages">
            <div className="chat-message">
              <span className="chat-author"><Link to="/classmates/jordan-lee">Jordan Lee</Link> · 12 min ago</span>
              <p>Should we focus on the fetch API and WebSockets tonight?</p>
            </div>
            <div className="chat-message">
              <span className="chat-author"><Link to="/classmates/priya-shah">Priya Shah</Link> · 8 min ago</span>
              <p>Yes, I can bring the practice problems from lecture. I found a good table on level 3.</p>
            </div>
            <div className="chat-message chat-message-you">
              <span className="chat-author">You · 5 min ago</span>
              <p>Perfect. I will review the service endpoints before we meet.</p>
            </div>
          </div>
          <div className="chat-composer">
            <label className="visually-hidden" htmlFor="message-input">Message your study group</label>
            <input className="form-control" id="message-input" type="text" placeholder="Write a message..." autoComplete="off" />
            <button className="button button-primary" type="button" disabled>Send</button>
          </div>
          <p className="websocket-note"><strong>WebSocket placeholder:</strong> Live group messages and member notifications will connect here in the WebSocket deliverable.</p>
        </div>
      </section>
    </main>
  );
}
