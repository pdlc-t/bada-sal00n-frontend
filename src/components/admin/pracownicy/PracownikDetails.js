import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

// Modal stylizacja
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const PracownikSzczegoly = ({ open, onClose, id, onPracownikZwolniony }) => {
  const [pracownik, setPracownik] = useState(null);

  // Fetch szczegółów pracownika
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/admin/pracownicy/${id}`)
        .then((response) => response.json())
        .then((data) => setPracownik(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [id]);

  // Funkcja zwalniająca pracownika
  const handleZwolnij = () => {
    fetch('http://localhost:8080/admin/pracownicy/delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( id ),
    })
      .then((response) => {
        if (response.ok) {
          // Zamknij modal i powiadom nadrzędny komponent o usunięciu
          onClose();
          onPracownikZwolniony(id);
        } else {
          console.error('Error during deleting employee');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  if (!pracownik) return null; // Jeśli dane nie są jeszcze załadowane

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Szczegóły Pracownika
        </Typography>
        <Typography>Imię: {pracownik.imie}</Typography>
        <Typography>Nazwisko: {pracownik.nazwisko}</Typography>
        <Typography>PESEL: {pracownik.pesel}</Typography>
        <Typography>Miasto: {pracownik.miasto}</Typography>
        <Typography>Ulica: {pracownik.ulica}</Typography>
        <Typography>Kod pocztowy: {pracownik.kodPocztowy}</Typography>
        <Typography>Nr Budynku: {pracownik.nrBudynku}</Typography>
        <Typography>Nr Lokalu: {pracownik.nrLokalu}</Typography>
        <Typography>Stanowisko: {pracownik.stanowisko}</Typography>
        <Typography>Tryb Pracy: {pracownik.trybPracy}</Typography>
        <Typography>Pensja: {pracownik.pensja}</Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>Zamknij</Button>
        <Button 
          onClick={handleZwolnij} 
          sx={{ mt: 2, backgroundColor: 'red', color: 'white' }}
        >
          Zwolnij
        </Button>
      </Box>
    </Modal>
  );
};

export default PracownikSzczegoly;
