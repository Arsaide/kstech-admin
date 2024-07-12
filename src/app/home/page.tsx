import React, { useContext } from 'react';
import { Alert, Typography } from '@mui/material';
import { AuthContext } from '../../providers/AuthProvider';

const HomePage = () => {
    const { remainingTime } = useContext(AuthContext);

    return (
        <>
            <Alert variant="filled" severity="success">
                Ви успішно авторизовані в адмін-панелі KS TECH!
            </Alert>
            <Typography sx={{ mt: 2 }}>
                Задля безпеки сесія діє {remainingTime ? remainingTime : '0'}{' '}
                годину!
            </Typography>
        </>
    );
};

export default HomePage;
