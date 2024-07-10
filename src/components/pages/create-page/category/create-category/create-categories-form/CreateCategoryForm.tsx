import React, { ChangeEvent, useContext } from 'react';
import { Context } from '../../../../../../api/context';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CreateCategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import { toast } from 'react-toastify';
import { Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CategoriesContext } from '../../../../../../providers/CategoriesProvider';
import { useResizeImages } from '../../../../../../hooks/use-resize-images/useResizeImages';
import { styled } from '@mui/system';

const Input = styled('input')({
    display: 'none',
});

const CreateCategoryForm = () => {
    const { store } = useContext(Context);
    const { setIsVisibleSubcategories } = useContext(CategoriesContext);
    const { originalImage, resizedImage, handleImageChange } =
        useResizeImages();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateCategoryResponseModel>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['category'],
        mutationFn: async (category: CreateCategoryResponseModel) => {
            await store.createCategory(
                category.category,
                originalImage,
                resizedImage,
            );
        },
        onError: e =>
            toast.error(`Сталась помилка при створені категорії: ${e}`),
        onSuccess: () => setIsVisibleSubcategories(true),
    });

    const onSubmit = (data: CreateCategoryResponseModel) => {
        mutate(data);
    };

    return (
        <Box>
            <Typography variant={'h4'}>Створення категорії</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name={'img'}
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <label htmlFor="file-input">
                            <Input
                                {...field}
                                accept="image/*"
                                id="file-input"
                                type="file"
                                onChange={e =>
                                    handleImageChange(
                                        e as ChangeEvent<HTMLInputElement>,
                                        field.onChange,
                                    )
                                }
                            />
                            <Button variant="outlined" component="span">
                                Завантажити файл
                            </Button>
                        </label>
                    )}
                />
                {originalImage && (
                    <img
                        src={URL.createObjectURL(originalImage)}
                        alt="Original"
                    />
                )}
                {resizedImage && (
                    <img
                        src={URL.createObjectURL(resizedImage)}
                        alt="Resized"
                    />
                )}
                <Controller
                    name={'category'}
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={'Назва категорії'}
                            fullWidth
                            margin={'normal'}
                            error={!!errors.category}
                            helperText={
                                errors.category ? errors.category.message : ''
                            }
                        />
                    )}
                />
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    disabled={isPending}
                >
                    {isPending ? 'Створення...' : 'Створити'}
                </Button>
                <p className={'hint'}>
                    *Підказка: після створення категорії ви перейдете на
                    наступний етап - створення підкатегорії. <br />
                    Створення підкатегорії не обов&apos;язкове, якщо вона вам не
                    потрібна
                </p>
                {isError && (
                    <Typography color="error">
                        Помилка: {error?.message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CreateCategoryForm;
