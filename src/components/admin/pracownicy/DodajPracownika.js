import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';

// Modal stylizacja
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh', // Ustawienie maksymalnej wysokości na 80% ekranu
  bgcolor: '#f9f9f9',
  border: '2px solid #008080',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflowY: 'auto', // Włączenie przewijania w pionie
};

const buttonStyle = {
  mt: 2,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#005959',
  },
};

const DodajPracownikaModal = ({ open, onClose, onPracownikDodany }) => {
  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    pesel: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    nrBudynku: '',
    nrLokalu: '',
    stanowisko: '',
    trybPracy: '',
    pensja: '',
  });

  // Funkcja do obsługi zmiany wartości w formularzu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcja do wysyłania danych pracownika
  const handleSubmit = () => {
    fetch('http://localhost:8080/admin/pracownicy/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Powiadomienie nadrzędnego komponentu o dodaniu pracownika
          onPracownikDodany(formData);
          onClose();
        } else {
          console.error('Error adding employee');
        }
      })
      .catch((error) => console.error('Error adding employee:', error));
  };

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
          Dodaj Nowego Pracownika
        </Typography>

        {/* Formularz */}
        <TextField
          label="Imię"
          variant="outlined"
          fullWidth
          name="imie"
          value={formData.imie}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nazwisko"
          variant="outlined"
          fullWidth
          name="nazwisko"
          value={formData.nazwisko}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="PESEL"
          variant="outlined"
          fullWidth
          name="pesel"
          value={formData.pesel}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Miasto"
          variant="outlined"
          fullWidth
          name="miasto"
          value={formData.miasto}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Ulica"
          variant="outlined"
          fullWidth
          name="ulica"
          value={formData.ulica}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Kod Pocztowy"
          variant="outlined"
          fullWidth
          name="kodPocztowy"
          value={formData.kodPocztowy}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nr Budynku"
          variant="outlined"
          fullWidth
          name="nrBudynku"
          value={formData.nrBudynku}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nr Lokalu"
          variant="outlined"
          fullWidth
          name="nrLokalu"
          value={formData.nrLokalu}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Stanowisko"
          variant="outlined"
          fullWidth
          name="stanowisko"
          value={formData.stanowisko}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tryb Pracy"
          variant="outlined"
          fullWidth
          name="trybPracy"
          value={formData.trybPracy}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Pensja"
          variant="outlined"
          fullWidth
          name="pensja"
          value={formData.pensja}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

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
            Anuluj
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              ...buttonStyle,
              backgroundColor: '#4caf50',
              color: '#fff',
            }}
          >
            Zatrudnij
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DodajPracownikaModal;
