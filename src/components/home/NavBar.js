import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="sticky" sx={{ boxShadow: 3, backgroundColor: '#F2D2DB' }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Rozmieszczenie elementów na różnych końcach
                    padding: '0 20px',
                }}
            >
                <Typography
    variant="h6"
    sx={{
        color: '#008080', // Użycie koloru przewodniego dla lepszej widoczności
        fontWeight: 700, // Zwiększona grubość
        fontSize: '1.5rem', // Większy rozmiar czcionki
        textTransform: 'uppercase', // Wielkie litery dla wyróżnienia
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtelny cień dla kontrastu
        letterSpacing: '0.1rem', // Odstępy między literami dla elegancji
    }}
>
    Sal00n
</Typography>


                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly', // Rozmieszczenie guzików równomiernie
                        gap: 2,
                        width: '100%', // Umożliwia równe rozmieszczenie guzików
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
