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
import PracownikSzczegoly from './PracownikDetails'; // Importujemy komponent
import DodajPracownikaModal from './DodajPracownika'; // Importujemy modal dodawania pracownika
import background from './images/zarzadzaj_pracownikami_background.jpg';

const PracownicyTable = () => {
  const [pracownicy, setPracownicy] = useState([]);
  const [selectedPracownikId, setSelectedPracownikId] = useState(null); // Przechowywanie wybranego id
  const [openModal, setOpenModal] = useState(false); // Stan do obsługi widoczności modalu
  const [openAddModal, setOpenAddModal] = useState(false); // Stan do obsługi widoczności modalu dodawania

  // Fetch danych pracowników
  useEffect(() => {
    fetch('http://localhost:8080/admin/pracownicy/list')
      .then((response) => response.json())
      .then((data) => setPracownicy(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Funkcja otwierająca modal szczegółów pracownika
  const handleRowClick = (id) => {
    setSelectedPracownikId(id);
    setOpenModal(true);
  };

  // Funkcja zamykająca modal szczegółów pracownika
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPracownikId(null);
  };

  // Funkcja zamykająca modal dodawania pracownika
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // Funkcja dodająca pracownika do listy
  const handlePracownikDodany = (newPracownik) => {
    setPracownicy([...pracownicy, newPracownik]);
  };

  // Funkcja usuwająca pracownika z listy
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
          maxHeight: '60vh', // Maksymalna wysokość dla tabeli
          overflowY: 'auto', // Włączenie scrollowania w osi Y
          '&::-webkit-scrollbar': {
            width: '12px', // Szerokość paska przewijania
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', // Tło śledzenia paska przewijania
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#008080', // Kolor "kciuka" paska przewijania
            borderRadius: '10px',
            border: '3px solid #f1f1f1', // Odstęp między kciukiem a śledzeniem
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#005959', // Kolor kciuka przy hoverze
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="pracownicy table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#008080',
                position: 'sticky',
                top: 0, // Przypięcie do góry
                zIndex: 1, // Zapewnienie, że nagłówek będzie nad zawartością tabeli
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
                onClick={() => handleRowClick(pracownik.id)} // Po kliknięciu otwieramy modal
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

      {/* Przyciski pod tabelą */}
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
          onClick={() => setOpenAddModal(true)} // Otwórz modal do dodania pracownika
        >
          Dodaj Pracownika
        </Button>
      </Box>

      {/* Wyświetlenie modalu z szczegółami pracownika */}
      <PracownikSzczegoly 
        open={openModal} 
        onClose={handleCloseModal} 
        id={selectedPracownikId} 
        onPracownikZwolniony={handlePracownikZwolniony} // Przekazanie funkcji do komponentu
      />

      {/* Wyświetlenie modalu do dodawania pracownika */}
      <DodajPracownikaModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onPracownikDodany={handlePracownikDodany} // Przekazanie funkcji do komponentu
      />
    </Box>
  );
};

export default PracownicyTable;
