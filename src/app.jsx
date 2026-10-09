import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { Home } from './home/home';
import { Login } from './login/login';
import { FindPartners } from './findPartners/findPartners';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-partners" element={<FindPartners />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
