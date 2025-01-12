import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Link do nawigacji

const NavBar = () => {
  return (
    <AppBar position="sticky" sx={{ boxShadow: 3, backgroundColor: '#F2D2DB' }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between', // Rozmieszczenie elementów na różnych końcach
          padding: '0 20px',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            sx={{
              textAlign: 'left',
              color: '#000',
              fontWeight: 600,
              fontSize: '1.25rem',
            }}
          >
            Sal00n
          </Typography>
        </Container>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              backgroundColor: '#008080',
              color: '#fff',
              boxShadow: 2,
              fontSize: '1rem',
              borderRadius: 5,
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#FBC6FF',
                boxShadow: 5,
              },
            }}
          >
            <Typography variant="body1">Strona główna</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/onas"
            sx={{
              backgroundColor: '#008080',
              color: '#fff',
              boxShadow: 2,
              fontSize: '1rem',
              borderRadius: 5,
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#FBC6FF',
                boxShadow: 5,
              },
            }}
          >
            <Typography variant="body1">O nas</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              backgroundColor: '#008080',
              color: '#fff',
              boxShadow: 2,
              fontSize: '1rem',
              borderRadius: 5,
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#005A9E',
                boxShadow: 5,
              },
            }}
          >
            <Typography variant="body1">Kontakt</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{
              backgroundColor: '#008080',
              color: '#fff',
              boxShadow: 2,
              fontSize: '1rem',
              borderRadius: 5,
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#005A9E',
                boxShadow: 5,
              },
            }}
          >
            <Typography variant="body1">O projekcie</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
