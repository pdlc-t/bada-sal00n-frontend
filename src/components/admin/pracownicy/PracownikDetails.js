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

const PracownikSzczegoly = ({ open, onClose, id }) => {
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
      </Box>
    </Modal>
  );
};

export default PracownikSzczegoly;
