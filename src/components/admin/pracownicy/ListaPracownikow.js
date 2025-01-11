import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PracownikSzczegoly from './PracownikDetails'; // Importujemy komponent

const PracownicyTable = () => {
  const [pracownicy, setPracownicy] = useState([]);
  const [selectedPracownikId, setSelectedPracownikId] = useState(null); // Przechowywanie wybranego id
  const [openModal, setOpenModal] = useState(false); // Stan do obsługi widoczności modalu

  // Fetch danych pracowników
  useEffect(() => {
    fetch('http://localhost:8080/admin/pracownicy/list')
      .then((response) => response.json())
      .then((data) => setPracownicy(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Funkcja otwierająca modal
  const handleRowClick = (id) => {
    setSelectedPracownikId(id);
    setOpenModal(true);
  };

  // Funkcja zamykająca modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPracownikId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pracownicy table">
          <TableHead>
            <TableRow>
              <TableCell>Imię</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Stanowisko</TableCell>
              <TableCell>Tryb Pracy</TableCell>
              <TableCell>Pensja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pracownicy.map((pracownik) => (
              <TableRow
                key={pracownik.id}
                hover
                onClick={() => handleRowClick(pracownik.id)} // Po kliknięciu otwieramy modal
                sx={{ cursor: 'pointer' }}
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

      {/* Wyświetlenie modalu z szczegółami pracownika */}
      <PracownikSzczegoly 
        open={openModal} 
        onClose={handleCloseModal} 
        id={selectedPracownikId} 
      />
    </>
  );
};

export default PracownicyTable;
