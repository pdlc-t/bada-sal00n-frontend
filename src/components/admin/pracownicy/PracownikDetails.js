import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ZmienModelModal from './ZmienModelPracy'; // Importujemy formularz

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
  const [showEditModal, setShowEditModal] = useState(false); // Zarządzanie stanem dla modala edycji
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const authHeader = sessionStorage.getItem('authHeader');
    if (id && open) {
      fetch(`http://localhost:8080/admin/pracownicy/${id}`, {
        method: 'GET',
            headers: {
                Authorization: authHeader ? `${authHeader}` : '', // Jeśli token jest dostępny, dodajemy go
            },
      })
        .then((response) => response.json())
        .then((data) => {
          setPracownik(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [id, open]);

  const handleZwolnij = () => {
    const authHeader = sessionStorage.getItem('authHeader');
    fetch('http://localhost:8080/admin/pracownicy/delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader ? `${authHeader}` : '',
      },
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.ok) {
          onPracownikZwolniony(id);
          setSuccessMessage('Pracownik został pomyślnie usunięty!');
          onClose();
        } else {
          alert('Błąd podczas usuwania pracownika.');
        }
      })
      .catch((error) => console.error('Error during deleting employee:', error));
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  if (!pracownik) return null;

  return (
    <Box>
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
              onClick={() => setShowEditModal(true)}
              variant="contained"
              sx={{ ...buttonStyle, backgroundColor: '#ffa500' }}
            >
              Zmień model
            </Button>

            <Button
              onClick={handleZwolnij}
              variant="contained"
              sx={{ ...buttonStyle, backgroundColor: '#ff0000' }}
            >
              Zwolnij
            </Button>

            <Button
              onClick={onClose}
              variant="contained"
              sx={{ ...buttonStyle, backgroundColor: '#008080' }}
            >
              Zamknij
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal edycji modelu pracy */}
      <ZmienModelModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        idPracownika={id}
      />
    </Box>
  );
};

export default PracownikSzczegoly;
