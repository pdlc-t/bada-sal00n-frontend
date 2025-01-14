import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import KupProdukt from './KupProdukt'; // Komponent obsługujący zakup produktu

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

const ProduktyDetails = ({ open, onClose, id }) => {
    const [produkt, setProdukt] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id && open) {
            fetch(`http://localhost:8080/sales/produkty/${id}`)
                .then((response) => response.json())
                .then((data) => setProdukt(data))
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [id, open]);

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    if (!produkt) return null;

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
                        Szczegóły Produktu
                    </Typography>

                    <Typography sx={{ mb: 1 }}>Nazwa: {produkt.nazwa}</Typography>
                    <Typography sx={{ mb: 2 }}>Opis: {produkt.opis}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => setShowBuyModal(true)}
                            variant="contained"
                            sx={{ ...buttonStyle, backgroundColor: '#ffa500' }}
                        >
                            Kup
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

            {/* Modal zakupu produktu */}
            <KupProdukt
                open={showBuyModal}
                onClose={() => setShowBuyModal(false)}
                produktId={id}
                onPurchaseSuccess={() => {
                    setSuccessMessage('Produkt został pomyślnie zakupiony!');
                    setShowBuyModal(false);
                }}
            />
        </Box>
    );
};

export default ProduktyDetails;
