import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import background from './images/admin_dashboard_background.jpg';
import zarzadzajPracownikami from './images/zarzadzaj_pracownikami.png';
import zarzadzajOferta from './images/zarzadzaj_oferta.png';
import zarzadzajSalonem from './images/zarzadzaj_salonem.png';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
          onClick={() => handleNavigation('/admin/zarzadzanie-oferta')}
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
          onClick={() => handleNavigation('/admin/zarzadzanie-salonem')}
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
    </Box>
  );
};

export default AdminDashboard;
