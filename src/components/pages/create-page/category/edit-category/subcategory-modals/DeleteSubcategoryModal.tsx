import React, { FC, useContext, useState } from 'react';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { Context } from '../../../../../../api/context';
import { toast } from 'react-toastify';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';

interface DeleteSubcategoryModalProps {
    name: string;
}

const DeleteSubcategoryModal: FC<DeleteSubcategoryModalProps> = ({ name }) => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['delete-subcategory'],
        mutationFn: async () => {
            await store.deleteSubcategory(name);
        },
        onError: e =>
            toast.error(`Сталась помилка при видалені підкатегорії: ${e}`),
        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: ['get-categories'],
            });
            queryClient.resetQueries({
                queryKey: ['get-one-category'],
            });
            setIsDeleted(true);
        },
    });

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant={'h6'} color="error" sx={{ mb: 4 }}>
                Ви впевнені, що хочете видалити підкатегорію? Після видалення
                підкатегорії, з категорію нічого не станеться
            </Typography>
            {isDeleted ? (
                <Button variant="contained" disabled={true}>
                    Підкатегорія видалена
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
                        : 'Я впевнений і хочу видалити підкатегорію!'}
                </Button>
            )}
            {isError && (
                <Typography color={MainColorsEnum.RED}>
                    {`Сталась помилка під час видалення підкатегорій! Помилка: ${error}`}
                </Typography>
            )}
        </Box>
    );
};

export default DeleteSubcategoryModal;
