import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './chat.css';

const initialConversations = {
  cs260: {
    title: 'CS 260 · Web Programming',
    time: 'Today, 6:30 PM · Harold B. Lee Library, Level 3',
    members: '3 members online',
    messages: [
      { id: 1, author: 'Jordan Lee', username: 'jordan-lee', text: 'Should we focus on the fetch API and WebSockets tonight?', you: false },
      { id: 2, author: 'Priya Shah', username: 'priya-shah', text: 'Yes, I can bring the practice problems from lecture.', you: false },
      { id: 3, author: 'You', text: 'Perfect. I will review the service endpoints before we meet.', you: true },
    ],
  },
  biology180: {
    title: 'Biology 180 · Exam review',
    time: 'Tomorrow, 4:00 PM · Life Sciences Building, Room 214',
    members: '2 members online',
    messages: [
      { id: 1, author: 'Maya Patel', username: 'maya-patel', text: 'I made a review list for cell structure and metabolism.', you: false },
    ],
  },
};

const simulatedReplies = [
  { username: 'priya-shah', author: 'Priya Shah', text: "I'll grab a table near the entrance." },
  { username: 'jordan-lee', author: 'Jordan Lee', text: 'Running a few minutes late, start without me.' },
  { username: 'maya-patel', author: 'Maya Patel', text: 'Just posted the slides to the group folder.' },
];

export function Chat() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeTab, setActiveTab] = useState('cs260');
  const [draft, setDraft] = useState('');
  const nextMessageId = useRef(100);

  // Simulates a peer's message arriving, the same way a real WebSocket
  // message would later be handled.
  useEffect(() => {
    const interval = setInterval(() => {
      const reply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];
      setConversations((prev) => ({
        ...prev,
        cs260: {
          ...prev.cs260,
          messages: [...prev.cs260.messages, { id: nextMessageId.current++, ...reply, you: false }],
        },
      }));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  function handleSend(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setConversations((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        messages: [...prev[activeTab].messages, { id: nextMessageId.current++, author: 'You', text, you: true }],
      },
    }));
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
