import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../utils/enums/colors-enum';


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
                    <Typography
                        sx={{
                            color: MainColorsEnum.BLACK,
                            textAlign: 'center',
                        }}
                    >
                        Зачекайте відповіді від серверу...
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default PendingPage;
