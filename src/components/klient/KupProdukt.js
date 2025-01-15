import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

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

const KupProdukt = ({ open, onClose, produktId, onPurchaseSuccess }) => {
    const [amount, setAmount] = useState(1);
    const [error, setError] = useState('');
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if (produktId) {
            fetch(`http://localhost:8080/sales/produkty/${produktId}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Nie udało się pobrać szczegółów produktu.');
                    }
                })
                .then((data) => setProductDetails(data))
                .catch((err) => setError(err.message));
        }
    }, [produktId]);

    const handlePurchase = () => {
        if (amount > productDetails.liczbaSztuk) {
            setError('Podana liczba sztuk przekracza dostępny stan magazynowy.');
            return;
        }

        const data = {
            idProduktu: produktId,
            amount,
            idKlienta: 1, // Stałe ID klienta
        };

        fetch('http://localhost:8080/sales/produkty/sell', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    onPurchaseSuccess();
                    setError('');
                    window.location.reload();  // Refresh the page
                } else {
                    response.json().then((errorData) => {
                        setError(errorData.message || 'Błąd podczas zakupu produktu.');
                    });
                }
            })
            .catch(() => setError('Wystąpił błąd podczas zakupu produktu.'));
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                    Zakup Produkt
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                {productDetails ? (
                    <>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            <strong>Nazwa:</strong> {productDetails.nazwa}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Opis:</strong> {productDetails.opis}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Dostępne sztuki:</strong> {productDetails.liczbaSztuk}
                        </Typography>

                        <TextField
                            label="Liczba sztuk"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            fullWidth
                            sx={{ mb: 2 }}
                            inputProps={{ min: 1, max: productDetails.liczbaSztuk }}
                        />

                        <Button
                            onClick={handlePurchase}
                            variant="contained"
                            sx={{
                                backgroundColor: '#008080',
                                color: '#fff',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#005959' },
                            }}
                            fullWidth
                        >
                            Kup
                        </Button>

                        <Button
                            onClick={onClose}  // Close modal on Cancel
                            variant="outlined"
                            sx={{
                                textTransform: 'uppercase',
                                marginTop: 2,
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#f1f1f1' },
                            }}
                            fullWidth
                        >
                            Anuluj
                        </Button>
                    </>
                ) : (
                    <Typography sx={{ textAlign: 'center' }}>
                        Ładowanie szczegółów produktu...
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default KupProdukt;
