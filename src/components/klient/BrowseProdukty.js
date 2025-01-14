import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProduktyDetails from './ProduktyDetails'; // Import komponentu szczegółów
import background from './images/browse_produkty_background.jpg';

const BrowseProdukty = () => {
    const [produkty, setProdukty] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // Przechowywanie ID wybranego produktu
    const [detailsOpen, setDetailsOpen] = useState(false); // Sterowanie otwieraniem okna szczegółów
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/sales/produkty/list')
            .then((response) => response.json())
            .then((data) => setProdukty(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleRowClick = (id) => {
        setSelectedProductId(id);
        setDetailsOpen(true);
    };

    const closeDetails = () => {
        setDetailsOpen(false);
        setSelectedProductId(null);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: `url(${background})`,
                padding: '20px',
            }}
        >
            {/* Przycisk powrotu w prawym górnym rogu */}
            <Button
                variant="outlined"
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#008080',
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    '&:hover': { backgroundColor: '#005959' },
                }}
                onClick={() => navigate('/client')}
            >
                Powrót
            </Button>

            <Typography
                variant="h4"
                sx={{
                    marginBottom: '20px',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
            >
                Lista Produktów
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    width: '80%',
                    boxShadow: 5,
                    borderRadius: '10px',
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '12px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#008080',
                        borderRadius: '10px',
                        border: '3px solid #f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#005959',
                    },
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="produkty table">
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#008080',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                            }}
                        >
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nazwa</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Cena</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Liczba Sztuk</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Producent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produkty.map((produkt) => (
                            <TableRow
                                key={produkt.id}
                                sx={{
                                    '&:hover': { backgroundColor: '#F5F5F5', cursor: 'pointer' },
                                }}
                                onClick={() => handleRowClick(produkt.id)}
                            >
                                <TableCell>{produkt.nazwa}</TableCell>
                                <TableCell>{produkt.cena} zł</TableCell>
                                <TableCell>{produkt.liczbaSztuk}</TableCell>
                                <TableCell>{produkt.nazwaProducenta}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#008080',
                        color: '#fff',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        '&:hover': { backgroundColor: '#005959' },
                    }}
                    onClick={() => window.location.reload()}
                >
                    Odśwież Listę
                </Button>
            </Box>

            {/* Komponent szczegółów produktu */}
            <ProduktyDetails
                open={detailsOpen}
                onClose={closeDetails}
                id={selectedProductId}
            />
        </Box>
    );
};

export default BrowseProdukty;
