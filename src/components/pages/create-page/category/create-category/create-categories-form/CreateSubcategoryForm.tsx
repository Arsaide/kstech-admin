import React from 'react';
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
import { SubcategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import { Controller, useForm } from 'react-hook-form';
import useGetAllCategories from '../../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import useCreateSubCategory from '../../../../../../hooks/queries/categories/use-create-subcategory/useCreateSubCategory';

const CreateSubcategoryForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SubcategoryResponseModel>();

    const {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    } = useGetAllCategories();

    const {
        createSubcategoryMutate,
        isPendingCreateSubcategory,
        isCreateSubcategoryError,
        mutateSubcategoryError,
    } = useCreateSubCategory();

    const onSubmit = (subcategoriesData: SubcategoryResponseModel) => {
        createSubcategoryMutate(subcategoriesData);
    };

    return (
        <Box>
            <Typography variant={'h4'}>Створення підкатегорії</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.category}
                    disabled={isCategoriesLoading}
                >
                    <InputLabel>Категорія</InputLabel>
                    <Controller
                        name={'category'}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <Select {...field} label={'Категорія'}>
                                {categoriesData &&
                                    categoriesData.map((item, index) => (
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
                    disabled={isPendingCreateSubcategory}
                >
                    {isPendingCreateSubcategory ? 'Створення...' : 'Створити'}
                </Button>
                {isCategoriesError && (
                    <Typography color="error">
                        Помилка категорії: {categoriesError?.message}
                    </Typography>
                )}
                {isCreateSubcategoryError && (
                    <Typography color="error">
                        Помилка підкатегорії: {mutateSubcategoryError?.message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CreateSubcategoryForm;
