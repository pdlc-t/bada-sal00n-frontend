import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // Importuj nowy NavBar
import '../../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  const handleClientLogin = () => {
    navigate('/client');
  };

  return (
    <div className="landing-page">
      <NavBar /> {/* Dodajemy NavBar na górze strony */}
      <main className="main-content">
        <h1>Witaj w naszej aplikacji!</h1>
        <button className="login-button" onClick={handleAdminLogin}>
          Zaloguj się jako admin
        </button>
        <button className="login-button" onClick={handleClientLogin}>
          Zaloguj się jako klient
        </button>
      </main>
      <footer className="footer">
        <p>© 2025 Twoja Aplikacja. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
