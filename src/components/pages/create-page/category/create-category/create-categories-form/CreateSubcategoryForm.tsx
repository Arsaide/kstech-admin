import React, { ChangeEvent } from 'react';
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
import { CreateSubcategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import { Controller, useForm } from 'react-hook-form';
import useGetAllCategories from '../../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import useCreateSubCategory from '../../../../../../hooks/queries/categories/use-create-subcategory/useCreateSubCategory';
import { useResizeImages } from '../../../../../../hooks/use-resize-images/useResizeImages';

const CreateSubcategoryForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateSubcategoryResponseModel>();

    const { originalImage, resizedImage, handleImageChange } =
        useResizeImages();

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
    } = useCreateSubCategory(originalImage, resizedImage);

    const onSubmit = (subcategoriesData: CreateSubcategoryResponseModel) => {
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
                    name={'img'}
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={'Картинка'}
                            type="file"
                            inputProps={{ accept: 'image/*' }}
                            onChange={e =>
                                handleImageChange(
                                    e as ChangeEvent<HTMLInputElement>,
                                    field.onChange,
                                )
                            }
                            margin={'normal'}
                            error={!!errors.img}
                            helperText={errors.img ? errors.img.message : ''}
                        />
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
