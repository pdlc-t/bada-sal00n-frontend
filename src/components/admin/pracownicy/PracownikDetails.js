import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

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

const stanowiskaOpcje = ['menadzer', 'usluger', 'sprzedawca', 'inne'];

const PracownikSzczegoly = ({ open, onClose, id, onPracownikZwolniony }) => {
  const [pracownik, setPracownik] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({ stanowisko: '', idPracownika: id });
  const [successMessage, setSuccessMessage] = useState(''); // Stan do komunikatu o sukcesie

  useEffect(() => {
    if (id && open) {
      fetch(`http://localhost:8080/admin/pracownicy/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setPracownik(data);
            setUpdatedData({ stanowisko: data.stanowisko, idPracownika: id });
            setEditMode(false);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }
  }, [id, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!stanowiskaOpcje.includes(updatedData.stanowisko)) {
      alert(`Stanowisko musi być jedną z wartości: ${stanowiskaOpcje.join(', ')}`);
      return;
    }

    fetch('http://localhost:8080/admin/pracownicy/update_model', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stanowisko: updatedData.stanowisko, idPracownika: id }),
    })
        .then((response) => {
          if (response.ok) {
            alert('Stanowisko pracownika zostało zaktualizowane!');
            setEditMode(false);
            onClose();
          } else {
            alert('Błąd podczas aktualizacji stanowiska pracownika.');
          }
        })
        .catch((error) => console.error('Error updating employee:', error));
  };

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
            onPracownikZwolniony(id);
            setSuccessMessage('Pracownik został pomyślnie usunięty!'); // Ustawienie komunikatu
            onClose();
          } else {
            alert('Błąd podczas usuwania pracownika.');
          }
        })
        .catch((error) => console.error('Error during deleting employee:', error));
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(''); // Ukrycie komunikatu
  };

  if (!pracownik) return null;

  return (
      <Box>
        {/* Snackbar do wyświetlenia komunikatu o pomyślnym usunięciu */}
        <Snackbar
            open={!!successMessage}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
        >
          <MuiAlert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: '100%' }}
          >
            {successMessage}
          </MuiAlert>
        </Snackbar>

        <Modal open={open} onClose={onClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
              Szczegóły Pracownika
            </Typography>

            {editMode ? (
                <TextField
                    label="Stanowisko (menadzer/usluger/sprzedawca/inne)"
                    variant="outlined"
                    fullWidth
                    name="stanowisko"
                    value={updatedData.stanowisko}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                />
            ) : (
                <>
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
                </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {editMode ? (
                  <Button onClick={handleUpdate} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#4caf50' }}>
                    Zapisz zmiany
                  </Button>
              ) : (
                  <Button onClick={() => setEditMode(true)} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#ffa500' }}>
                    Zmień stanowisko
                  </Button>
              )}

              <Button onClick={handleZwolnij} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#ff0000' }}>
                Zwolnij
              </Button>

              <Button onClick={onClose} variant="contained" sx={{ ...buttonStyle, backgroundColor: '#008080' }}>
                Zamknij
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
  );
};

export default PracownikSzczegoly;
