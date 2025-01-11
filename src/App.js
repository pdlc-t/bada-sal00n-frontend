import React from 'react';
import './App.css';
import './css/LandingPage.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/home/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientPage from './components/klient/ClientPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OnasPage from './components/OnasPage'; // Importujemy nowy komponent

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/onas" element={<OnasPage />} /> {/* Nowa strona "O aplikacji" */}
      </Routes>
    </Router>
  );
}

export default App;
