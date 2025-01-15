import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import accessDeniedIcon from './access_denied_icon.png';

const AccessDeniedPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36454F', // Light background color
        padding: '16px',
      }}
    >
      {/* Central content with image and text */}
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={accessDeniedIcon}
          alt="Access Denied"
          sx={{
            width: '300px',
            height: '300px',
            marginBottom: '16px',
          }}
          draggable="false"
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D70040' }}>
          Nie przyznano dostępu do tej strony
        </Typography>
      </Box>

      {/* Return button in the corner */}
      <Button
        onClick={() => navigate('/')}
        sx={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          backgroundColor: '#D70040',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#602060',
          },
        }}
        variant="contained"
      >
        Powrót
      </Button>
    </Box>
  );
};

export default AccessDeniedPage;
