import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BasicTable({ pracownicyList }) {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: '#ffffff' }} aria-label="styled table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#007bff' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Imię</TableCell>
              <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Nazwisko</TableCell>
              <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Stanowisko</TableCell>
              <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Tryb Pracy</TableCell>
              <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Pensja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pracownicyList.map((row) => (
              <TableRow
                key={row.imie}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f3f3f3' },
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell component="th" scope="row">{row.imie}</TableCell>
                <TableCell align="right">{row.nazwisko}</TableCell>
                <TableCell align="right">{row.stanowisko}</TableCell>
                <TableCell align="right">{row.trybPracy}</TableCell>
                <TableCell align="right">{row.pensja}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={() => alert('Dodaj Pracownika')}>
          Dodaj Pracownika
        </Button>
        <Button variant="outlined" color="error" onClick={() => alert('Usuń Pracownika')}>
          Usuń Pracownika
        </Button>
      </Box>
    </Box>
  );
}
