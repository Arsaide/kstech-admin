import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../api/context';
import { Alert, Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../../../utils/enums/colors-enum';

const ProductId = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['product-id', id],
        queryFn: async () => await store.getOneProduct(id),
    });
    return (
        <div>
            {isLoading ? (
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
            ) : isError ? (
                <Alert variant="filled" severity="error">
                    Error: {error.message}
                </Alert>
            ) : (
                <div>

                </div>
            )}
        </div>
    );
};

export default ProductId;
