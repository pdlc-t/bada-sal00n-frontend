import React from 'react';
import './App.css';
import './css/LandingPage.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/home/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientDashboard from './components/klient/ClientDashboard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OnasPage from './components/OnasPage';
import ListaPracownikow from './components/admin/pracownicy/ListaPracownikow';
import UnderConstructionPage from './components/UnderConstructionPage';
import BrowseProdukty from './components/klient/BrowseProdukty';
import KlientLogin from './components/klient/KlientLogin';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import FourOFourErrorPage from './components/FourOFourErrorPage';
import AccessDeniedPage from './components/AccessDeniedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
        {/* Route chroniony dla użytkowników z rolą 'user' */}
        <Route path="/client" element={<UserRoute element={<ClientDashboard />} />} />
        <Route path="/about" element={<UnderConstructionPage />} />
        <Route path="/contact" element={<UnderConstructionPage />} />
        <Route path="/onas" element={<UnderConstructionPage />} />
        <Route path="/admin/zarzadzanie-pracownikami" element={<AdminRoute element={<ListaPracownikow />} />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
        {/* Route chroniony dla użytkowników z rolą 'user' */}
        <Route path="/klient/przegladaj-produkty" element={<UserRoute element={<BrowseProdukty />} />} />
        <Route path="/login" element={<KlientLogin />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="*" element={<FourOFourErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
