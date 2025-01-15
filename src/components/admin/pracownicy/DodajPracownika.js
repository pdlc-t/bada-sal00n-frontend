import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  bgcolor: '#f9f9f9',
  border: '2px solid #008080',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflowY: 'auto',
};

const buttonStyle = {
  mt: 2,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#005959',
  },
};

const DodajPracownikaModal = ({ open, onClose }) => {
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

  const [errors, setErrors] = useState({});

  const stanowiskaOpcje = ['menadzer', 'usluger', 'sprzedawca', 'inne'];
  const trybPracyOpcje = ['pelny etat', 'pol etatu', 'cwierc etatu'];

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!/\d{11}$/.test(formData.pesel)) {
      newErrors.pesel = 'PESEL musi składać się z 11 cyfr';
      valid = false;
    }
    if (!/\d+$/.test(formData.nrBudynku)) {
      newErrors.nrBudynku = 'Nr budynku musi być liczbą';
      valid = false;
    }
    if (!/\d*$/.test(formData.nrLokalu)) {
      newErrors.nrLokalu = 'Nr lokalu musi być liczbą';
      valid = false;
    }
    if (!/\d{2}-\d{3}$/.test(formData.kodPocztowy)) {
      newErrors.kodPocztowy = 'Kod pocztowy musi mieć format XX-XXX';
      valid = false;
    }
    if (!stanowiskaOpcje.includes(formData.stanowisko)) {
      newErrors.stanowisko = `Stanowisko musi być jedną z wartości: ${stanowiskaOpcje.join(', ')}`;
      valid = false;
    }
    if (!trybPracyOpcje.includes(formData.trybPracy)) {
      newErrors.trybPracy = `Tryb pracy musi być jedną z wartości: ${trybPracyOpcje.join(', ')}`;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const authHeader = sessionStorage.getItem('authHeader');
    if (!validateForm()) {
      alert('Formularz zawiera błędy! Popraw dane przed wysłaniem.');
      return;
    }
    fetch('http://localhost:8080/admin/pracownicy/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader ? `${authHeader}` : '',
      },
      body: JSON.stringify(formData),
    })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            alert('Wystąpił błąd podczas dodawania pracownika.');
          }
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
          alert('Wystąpił błąd podczas dodawania pracownika.');
        });
  };

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ textAlign: 'center', color: '#008080', fontWeight: 'bold', textTransform: 'uppercase', mb: 2 }}>
            Dodaj Nowego Pracownika
          </Typography>

          {Object.entries(formData).map(([key, value]) => (
              <TextField
                  key={key}
                  label={
                    key === 'stanowisko'
                        ? 'Stanowisko (menadzer/usluger/sprzedawca/inne)'
                        : key === 'trybPracy'
                            ? 'Tryb Pracy (pelny etat/pol etatu/cwierc etatu)'
                            : key.charAt(0).toUpperCase() + key.slice(1)
                  }
                  variant="outlined"
                  fullWidth
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  error={!!errors[key]}
                  helperText={errors[key]}
              />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={onClose} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#008080', color: '#fff' }}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#4caf50', color: '#fff' }}>
              Zatrudnij
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default DodajPracownikaModal;
