import React from 'react';
import { Alert, Typography } from '@mui/material';
import { formatTime } from '../../utils/formatTime';

const HomePage = () => {
    const remainingTime = parseInt(
        localStorage.getItem('remainingTime') || '3600',
        10,
    );

    return (
        <>
            <Alert variant="filled" severity="success">
                Ви успішно авторизовані в адмін-панелі KS TECH!
            </Alert>
            <Typography>
                Задля безпеки сесія діє {formatTime(remainingTime)} годину!
            </Typography>
        </>
    );
};

export default HomePage;
