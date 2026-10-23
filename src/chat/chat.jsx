import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as store from '../mock/store';
import './chat.css';

export function Chat() {
  const [conversations, setConversations] = useState(() => store.getConversations());
  const [activeTab, setActiveTab] = useState('cs260');
  const [draft, setDraft] = useState('');

  // Simulates a peer's message arriving, the same way a real WebSocket
  // message would later be handled.
  useEffect(() => {
    return store.startChatFeed(setConversations);
  }, []);

  function handleSend(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setConversations(store.sendMessage(activeTab, { author: 'You', text, you: true }));
    setDraft('');
  }

  const active = conversations[activeTab];

  return (
    <main>
      <section aria-labelledby="chat-title">
        <p className="eyebrow">Study together, wherever you are</p>
        <h1 id="chat-title">Group chat.</h1>
        <p className="muted">Coordinate your next session and keep the conversation in one place.</p>
      </section>

      <section className="chat-layout" aria-label="Study group conversations">
        <div className="chat-tabs" role="tablist" aria-label="Joined study sessions">
          {Object.entries(conversations).map(([id, conversation]) => (
            <button
              key={id}
              className={`chat-tab${id === activeTab ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={id === activeTab}
              onClick={() => setActiveTab(id)}
            >
              <strong>{conversation.title.split(' · ')[0]}</strong>
              <span>{conversation.members}</span>
            </button>
          ))}
        </div>

        <div className="chat-window">
          <header className="chat-window-header">
            <h2>{active.title}</h2>
            <p>{active.time}</p>
          </header>
          <div className="chat-messages">
            {active.messages.map((message) => (
              <div className={`chat-message${message.you ? ' chat-message-you' : ''}`} key={message.id}>
                <span className="chat-author">
                  {message.you ? 'You' : <Link to={`/classmates/${message.username}`}>{message.author}</Link>}
                </span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <form className="chat-composer" onSubmit={handleSend}>
            <label className="visually-hidden" htmlFor="message-input">Message your study group</label>
            <input
              className="form-control"
              id="message-input"
              type="text"
              placeholder="Write a message..."
              autoComplete="off"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button className="button button-primary" type="submit" disabled={!draft.trim()}>Send</button>
          </form>
          <p className="websocket-note"><strong>WebSocket placeholder:</strong> Incoming messages are simulated with setInterval until a real WebSocket connection replaces it.</p>
        </div>
      </section>
    </main>
  );
}
