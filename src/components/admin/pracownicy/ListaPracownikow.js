import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

const PracownicyTable = () => {
  const [pracownicy, setPracownicy] = useState([]);
  
  // Fetching data from backend
  useEffect(() => {
    fetch('http://localhost:8080/admin/pracownicy/list')
      .then((response) => response.json())
      .then((data) => {
        console.log('Dane:', data);  // Sprawdzenie struktury danych
        setPracownicy(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  
  // Handler for row click
  const handleRowClick = (id) => {
    console.log('Wybrany ID:', id);
  };

  return (
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
              onClick={() => handleRowClick(pracownik.id)} // Pass the id to handle click
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
  );
};

export default PracownicyTable;
