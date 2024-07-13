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
import { styled } from '@mui/system';

const Input = styled('input')({
    display: 'none',
});

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
                <Box sx={{ display: 'flex', mt: 2 }}>
                    {resizedImage && (
                        <Box>
                            <p className={'modalHintImgSize'}>126 x 126</p>
                            <img
                                src={URL.createObjectURL(resizedImage)}
                                alt="Resized"
                            />
                        </Box>
                    )}
                    {originalImage && (
                        <Box>
                            <p className={'modalHintImgSize'}>726 x 726</p>
                            <img
                                src={URL.createObjectURL(originalImage)}
                                alt="Original"
                            />
                        </Box>
                    )}
                </Box>
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
