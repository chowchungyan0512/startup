import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { Home } from './home/home';
import { Login } from './login/login';
import { FindPartners } from './findPartners/findPartners';
import { StudySession } from './studySession/studySession';
import { Chat } from './chat/chat';
import { Profile } from './profile/profile';
import { OtherProfile } from './otherProfile/otherProfile';
import { NotFound } from './common/notFound';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-partners" element={<FindPartners />} />
        <Route path="/study-session" element={<StudySession />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/classmates/:username" element={<OtherProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
