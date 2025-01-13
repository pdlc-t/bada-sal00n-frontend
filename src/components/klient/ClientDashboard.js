import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../home/NavBar'; // Import NavBar
import background from './images/client_dashboard_background.jpeg';
// import zarzadzajPracownikami from './images/zarzadzaj_pracownikami.png';
// import zarzadzajOferta from './images/zarzadzaj_oferta.png';
// import zarzadzajSalonem from './images/zarzadzaj_salonem.png';
import przegladajProdukty from './images/przegladaj_produkty.png';
import przegladajUslugi from './images/przegladaj_uslugi.png';
import przegladajUslugerow from './images/przegladaj_uslugerow.png';

const ClientDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* NavBar component added at the top */}
      <NavBar />

      {/* Admin Dashboard content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexGrow: 1, // Ensure content stretches to fill remaining space
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 buttons per row
            gap: 0, // No gap between tiles
            width: '80%',
          }}
        >
          <Button
            onClick={() => handleNavigation('/klient/przegladaj-produkty')}
            sx={{
              width: '100%',
              aspectRatio: '1', // Ensure the button is perfectly square
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FBC6CF', // Solid tile color (Windows 10 style)
              color: '#fff',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#FBC6FF',
              },
            }}
          >
            <img
              src={przegladajProdukty}
              alt="przegladaj_produkty_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Przeglądaj Produkty
            </Typography>
          </Button>

          <Button
            onClick={() => handleNavigation('/under-construction')}
            sx={{
              width: '100%',
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1035AC',
              color: '#fff',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#005A9E',
              },
            }}
          >
            <img
              src={przegladajUslugi}
              alt="przegladaj_uslugi_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Przeglądaj Usługi
            </Typography>
          </Button>

          <Button
            onClick={() => handleNavigation('/under-construction')}
            sx={{
              width: '100%',
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#008080',
              color: '#fff',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#0080AA',
              },
            }}
          >
            <img
              src={przegladajUslugerow}
              alt="przegladaj_uslugerow_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Przeglądaj Usługerów
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
