import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../home/NavBar'; // Import NavBar
import background from './images/admin_dashboard_background.jpg';
import zarzadzajPracownikami from './images/zarzadzaj_pracownikami.png';
import zarzadzajOferta from './images/zarzadzaj_oferta.png';
import zarzadzajSalonem from './images/zarzadzaj_salonem.png';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear the session storage
    navigate('/'); // Navigate to the homepage
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
            onClick={() => handleNavigation('/admin/zarzadzanie-pracownikami')}
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
              src={zarzadzajPracownikami}
              alt="zarzadzaj_pracownikami_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Zarządzaj Pracownikami
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
              src={zarzadzajOferta}
              alt="zarzadzaj_oferta_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Zarządzaj Ofertą
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
              src={zarzadzajSalonem}
              alt="zarzadzaj_salonem_img"
              style={{ marginBottom: '8px', width: '50%', height: '50%' }}
              draggable="false"
            />
            <Typography variant="h6" align="center">
              Zarządzaj Salonem
            </Typography>
          </Button>
        </Box>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          sx={{
            position: 'absolute',
            top: '80px', // Positioned slightly below the NavBar
            right: '20px',
            backgroundColor: '#d32f2f', // Red color for logout button
            color: '#fff',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#c2185b',
            },
          }}
        >
          Wyloguj
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
