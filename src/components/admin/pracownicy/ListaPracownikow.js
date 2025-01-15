import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PracownikSzczegoly from './PracownikDetails';
import DodajPracownikaModal from './DodajPracownika';
import background from './images/zarzadzaj_pracownikami_background.jpg';

const PracownicyTable = () => {
    const [pracownicy, setPracownicy] = useState([]);
    const [selectedPracownikId, setSelectedPracownikId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Pobieramy token z sessionStorage
        const authHeader = sessionStorage.getItem('authHeader');

        // Wykonujemy zapytanie z odpowiednim nagłówkiem Authorization
        fetch('http://localhost:8080/admin/pracownicy/list', {
            method: 'GET',
            headers: {
                Authorization: authHeader ? `${authHeader}` : '', // Jeśli token jest dostępny, dodajemy go
            },
        })
            .then((response) => response.json())
            .then((data) => setPracownicy(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleRowClick = (id) => {
        setSelectedPracownikId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPracownikId(null);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const handlePracownikDodany = (newPracownik) => {
        setPracownicy([...pracownicy, newPracownik]);
    };

    const handlePracownikZwolniony = (id) => {
        setPracownicy(pracownicy.filter((pracownik) => pracownik.id !== id));
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
                onClick={() => navigate('/admin')}
            >
                Powrót
            </Button>

            <Typography
                variant="h4"
                sx={{
                    marginBottom: '20px',
                    color: '#000000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
            >
                Lista Pracowników
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
                <Table sx={{ minWidth: 650 }} aria-label="pracownicy table">
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#008080',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                            }}
                        >
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Imię</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nazwisko</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Stanowisko</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Tryb Pracy</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Pensja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pracownicy.map((pracownik) => (
                            <TableRow
                                key={pracownik.id}
                                hover
                                onClick={() => handleRowClick(pracownik.id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: '#F5F5F5' },
                                }}
                            >
                                <TableCell>{pracownik.imie}</TableCell>
                                <TableCell>{pracownik.nazwisko}</TableCell>
                                <TableCell>{pracownik.stanowisko}</TableCell>
                                <TableCell>{pracownik.trybPracy}</TableCell>
                                <TableCell>{pracownik.pensja}</TableCell>
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
                    onClick={() => setOpenAddModal(true)}
                >
                    Dodaj Pracownika
                </Button>
            </Box>

            <PracownikSzczegoly
                open={openModal}
                onClose={handleCloseModal}
                id={selectedPracownikId}
                onPracownikZwolniony={handlePracownikZwolniony}
            />

            <DodajPracownikaModal
                open={openAddModal}
                onClose={handleCloseAddModal}
                onPracownikDodany={handlePracownikDodany}
            />
        </Box>
    );
};

export default PracownicyTable;
