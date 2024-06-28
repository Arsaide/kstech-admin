import React, { useContext } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { SubcategoryResponseModel } from '../../../../../api/models/CategoriesResponseModel';
import { Context } from '../../../../../api/context';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../../providers/AuthProvider';

const CreateSubcategoryForm = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SubcategoryResponseModel>();

    const {
        isLoading,
        isError: isQueryError,
        error: queryError,
        data,
    } = useQuery({
        queryKey: ['get-categories'],
        queryFn: async () => await store.getAllCategories(),
        enabled: isLoggedIn,
        select: data => data.data,
    });

    const {
        mutate,
        isPending,
        isError: isMutateError,
        error: mutateError,
    } = useMutation({
        mutationKey: ['create-subcategory'],
        mutationFn: async (subcategory: SubcategoryResponseModel) =>
            store.addSubcategory(subcategory.category, subcategory.subcategory),
    });

    const onSubmit = (subcategoriesData: SubcategoryResponseModel) => {
        mutate(subcategoriesData);
    };

    return (
        <Box>
            <Typography variant={'h4'}>Створення підкатегорії</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.category}
                    disabled={isLoading}
                >
                    <InputLabel>Категорія</InputLabel>
                    <Controller
                        name={'category'}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <Select {...field} label={'Категорія'}>
                                {data &&
                                    data.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.category}
                                        </MenuItem>
                                    ))}
                            </Select>
                        )}
                    />
                    {errors.category && (
                        <Typography color="error">
                            {errors.category.message}
                        </Typography>
                    )}
                </FormControl>
                <Controller
                    name={'subcategory'}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={'Підкатегорія'}
                            placeholder={'Введіть вашу категорію'}
                            fullWidth
                            margin="normal"
                            error={!!errors.subcategory}
                            helperText={
                                errors.subcategory
                                    ? errors.subcategory.message
                                    : ''
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
                {isQueryError && (
                    <Typography color="error">
                        Помилка категорії: {queryError?.message}
                    </Typography>
                )}
                {isMutateError && (
                    <Typography color="error">
                        Помилка підкатегорії: {mutateError?.message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CreateSubcategoryForm;
