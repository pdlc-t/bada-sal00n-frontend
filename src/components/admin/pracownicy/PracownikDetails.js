import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

// Modal stylizacja
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f9f9f9',
  border: '2px solid #008080',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

const buttonStyle = {
  mt: 2,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#005959',
  },
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
      body: JSON.stringify(id),
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
      .catch((error) => console.error('Error during deleting employee:', error));
  };

  if (!pracownik) return null; // Jeśli dane nie są jeszcze załadowane

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            textAlign: 'center',
            color: '#008080',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          Szczegóły Pracownika
        </Typography>
        <Typography sx={{ mb: 1 }}>Imię: {pracownik.imie}</Typography>
        <Typography sx={{ mb: 1 }}>Nazwisko: {pracownik.nazwisko}</Typography>
        <Typography sx={{ mb: 1 }}>PESEL: {pracownik.pesel}</Typography>
        <Typography sx={{ mb: 1 }}>Miasto: {pracownik.miasto}</Typography>
        <Typography sx={{ mb: 1 }}>Ulica: {pracownik.ulica}</Typography>
        <Typography sx={{ mb: 1 }}>Kod pocztowy: {pracownik.kodPocztowy}</Typography>
        <Typography sx={{ mb: 1 }}>Nr Budynku: {pracownik.nrBudynku}</Typography>
        <Typography sx={{ mb: 1 }}>Nr Lokalu: {pracownik.nrLokalu}</Typography>
        <Typography sx={{ mb: 1 }}>Stanowisko: {pracownik.stanowisko}</Typography>
        <Typography sx={{ mb: 1 }}>Tryb Pracy: {pracownik.trybPracy}</Typography>
        <Typography sx={{ mb: 2 }}>Pensja: {pracownik.pensja}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              ...buttonStyle,
              backgroundColor: '#008080',
              color: '#fff',
            }}
          >
            Zamknij
          </Button>
          <Button
            onClick={handleZwolnij}
            variant="contained"
            sx={{
              ...buttonStyle,
              backgroundColor: '#ff0000',
              color: '#fff',
            }}
          >
            Zwolnij
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PracownikSzczegoly;
