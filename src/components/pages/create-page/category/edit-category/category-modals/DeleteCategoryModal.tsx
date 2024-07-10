import React, { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { Context } from '../../../../../../api/context';
import { toast } from 'react-toastify';
import { CategoriesContext } from '../../../../../../providers/CategoriesProvider';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';

const DeleteCategoryModal = () => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const { categoryId } = useContext(CategoriesContext);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['delete-category'],
        mutationFn: async () => {
            await store.deleteCategory(categoryId);
        },
        onError: e =>
            toast.error(`Сталась помилка при видалені категорії: ${e}`),
        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: ['get-categories'],
            });
            queryClient.resetQueries({ queryKey: ['get-one-category'] });
            setIsDeleted(true);
        },
    });

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant={'h6'} color="error" sx={{ mb: 4 }}>
                Ви впевнені, що хочете видалити категорію? Після видалення
                категорії видаляться всі підкатегорії
            </Typography>
            {isDeleted ? (
                <Button variant="contained" disabled={true}>
                    Категорія видалена
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
                        : 'Я впевнений і хочу видалити категорію!'}
                </Button>
            )}
            {isError && (
                <Typography color={MainColorsEnum.RED}>
                    {`Сталась помилка під час видалення категорій! Помилка: ${error}`}
                </Typography>
            )}
        </Box>
    );
};

export default DeleteCategoryModal;
