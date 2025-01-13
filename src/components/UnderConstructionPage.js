import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import constructionImage from './under_construction.png';

const UnderConstruction = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008080', // Light background color
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
          src={constructionImage}
          alt="Under Construction"
          sx={{
            width: '300px',
            height: '300px',
            marginBottom: '16px',
          }}
          draggable="false"
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Under Construction
        </Typography>
      </Box>

      {/* Return button in the corner */}
      <Button
        onClick={() => navigate(-1)}
        sx={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          backgroundColor: '#fbc6cf',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
        variant="contained"
      >
        Powrót
      </Button>
    </Box>
  );
};

export default UnderConstruction;
