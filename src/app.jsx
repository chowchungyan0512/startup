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
import { AuthProvider } from './auth/AuthContext';
import { RequireAuth } from './auth/RequireAuth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-partners" element={<RequireAuth><FindPartners /></RequireAuth>} />
          <Route path="/study-session" element={<RequireAuth><StudySession /></RequireAuth>} />
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/classmates/:username" element={<RequireAuth><OtherProfile /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
