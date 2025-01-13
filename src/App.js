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
import ListaPracownikow from './components/admin/pracownicy/ListaPracownikow'
import UnderConstructionPage from './components/UnderConstructionPage'

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
        <Route path="/admin/zarzadzanie-pracownikami" element={<ListaPracownikow />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
