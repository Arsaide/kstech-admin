import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

const PendingPage = () => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CircularProgress
                        size={300}
                        thickness={2}
                        color={'success'}
                    />
                    <Typography sx={{ color: '#333', textAlign: 'center' }}>
                        Подождите пока загрузится сайт
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default PendingPage;
