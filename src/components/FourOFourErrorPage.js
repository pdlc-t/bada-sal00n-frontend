import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import errorIcon from './404icon.png';

const FourOFourErrorPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D70040', // Light background color
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
          src={errorIcon}
          alt="Under Construction"
          sx={{
            width: '300px',
            height: '300px',
            marginBottom: '16px',
          }}
          draggable="false"
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Strona nie istnieje
        </Typography>
      </Box>

      {/* Return button in the corner */}
      <Button
        onClick={() => navigate('/')}
        sx={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          backgroundColor: '#702963',
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

export default FourOFourErrorPage;
