import React, { FC, useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Trash2 } from 'lucide-react';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { Context } from '../../../../../../api/context';
import { toast } from 'react-toastify';

interface ProductDeleteModalProps {
    id: string | undefined;
    name: string;
}

const ProductDeleteModal: FC<ProductDeleteModalProps> = ({ id, name }) => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['delete-product'],
        mutationFn: async () => {
            await store.deleteProduct(id);
        },
        onError: e => toast.error(`Сталась помилка при видалені товару: ${e}`),
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['products'] });
            setIsDeleted(true);
        },
    });

    return (
        <Box>
            <Typography variant={'h6'} color="error" sx={{ mb: 4 }}>
                Ви впевнені, що хочете видалити товар &ldquo;{name}&ldquo;?
                Після видалення товару повернути його буде неможливо!
            </Typography>
            {isDeleted ? (
                <Button variant="contained" disabled={true}>
                    Товар видалено
                </Button>
            ) : (
                <Button
                    onClick={() => mutate()}
                    variant="contained"
                    disabled={isPending}
                    color="error"
                >
                    <Trash2 style={{ marginRight: '10px' }} />
                    {isPending
                        ? 'Видалення...'
                        : 'Я впевнений і хочу видалити товар!'}
                </Button>
            )}
            {isError && (
                <Typography color={MainColorsEnum.RED}>
                    {`Сталась помилка під час видалення товару! Помилка: ${error}`}
                </Typography>
            )}
        </Box>
    );
};

export default ProductDeleteModal;
