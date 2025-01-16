import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // Importuj nowy NavBar
import '../../css/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            <NavBar /> {/* Dodajemy NavBar na górze strony */}
            <main className="main-content">
                <h1>Witaj w naszej Sal00nie!</h1>
                <button className="login-button" onClick={handleLogin}>
                    Zaloguj się do Sal00nu
                </button>
            </main>
            <footer className="footer">
                <p>©BADA Big Data Development</p>
            </footer>
        </div>
    );
};

export default LandingPage;
