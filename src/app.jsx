import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { Home } from './home/home';
import { Login } from './login/login';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
