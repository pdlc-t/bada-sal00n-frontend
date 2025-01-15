import React from 'react';
import './App.css';
import './css/LandingPage.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/home/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientDashboard from './components/klient/ClientDashboard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OnasPage from './components/OnasPage'; // Importujemy nowy komponent
import ListaPracownikow from './components/admin/pracownicy/ListaPracownikow';
import UnderConstructionPage from './components/UnderConstructionPage';
import BrowseProdukty from './components/klient/BrowseProdukty';
import KlientLogin from './components/klient/KlientLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/onas" element={<OnasPage />} /> {/* Nowa strona "O aplikacji" */}
        <Route path="/admin/zarzadzanie-pracownikami" element={<ListaPracownikow />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
        <Route path="/klient/przegladaj-produkty" element={<BrowseProdukty />} />
        <Route path="/klient/login" element={<KlientLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
