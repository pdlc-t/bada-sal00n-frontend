import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // Link do nawigacji

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Twoja Aplikacja
          </Typography>
          <Button color="inherit" component={Link} to="/onas">O nas</Button>
          <Button color="inherit" component={Link} to="/contact">Kontakt</Button>
          <Button color="inherit" component={Link} to="/about">O projekcie</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
