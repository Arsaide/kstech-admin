import React, { BaseSyntheticEvent, FC } from 'react';
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
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ProductDataTypes } from '../../../../types/forms/ProductData.types';
import ImageUploadManager from '../../../layout/common/ui/form-inputs/image-upload-manager/ImageUploadManager';

interface CreateFormProps {
    handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    control: Control<ProductDataTypes>;
    errors: FieldErrors<ProductDataTypes>;
    isPending: boolean;
    isError: boolean;
    error: any;
}

const CreateForm: FC<CreateFormProps> = ({
    handleSubmit,
    control,
    error,
    isPending,
    isError,
    errors,
}) => {
    return (
        <Box>
            <Typography>Create Product</Typography>
            <Box component={'form'} onSubmit={handleSubmit}>
                <Controller
                    name="imgArr"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <>
                            <ImageUploadManager field={field} />
                            {errors.imgArr && (
                                <p style={{ color: 'red' }}>
                                    {errors.imgArr.message}
                                </p>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    )}
                />
                <Controller
                    name="colors"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Colors (comma separated)"
                            fullWidth
                            margin="normal"
                            error={!!errors.colors}
                            helperText={
                                errors.colors ? errors.colors.message : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            fullWidth
                            margin="normal"
                            error={!!errors.description}
                            helperText={
                                errors.description
                                    ? errors.description.message
                                    : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Price"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={!!errors.price}
                            helperText={
                                errors.price ? errors.price.message : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="discounts"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Discount"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={!!errors.discounts}
                            helperText={
                                errors.discounts ? errors.discounts.message : ''
                            }
                        />
                    )}
                />
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.inAvailability}
                >
                    <InputLabel>In Availability</InputLabel>
                    <Controller
                        name="inAvailability"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Select {...field} label="In Availability">
                                <MenuItem value={'Можно'}>Можно</MenuItem>
                                <MenuItem value={'Нет'}>Нет</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.inAvailability && (
                        <Typography color="error">
                            {errors.inAvailability.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.deliveryMethod}
                >
                    <InputLabel>delivery Method</InputLabel>
                    <Controller
                        name="deliveryMethod"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Select {...field} label="delivery Method">
                                <MenuItem value={'Новая почта'}>
                                    Новая почта
                                </MenuItem>
                                <MenuItem value={'Укр почта'}>
                                    Укр почта
                                </MenuItem>
                                <MenuItem value={'Доставка на дом'}>
                                    Доставка на дом
                                </MenuItem>
                            </Select>
                        )}
                    />
                    {errors.deliveryMethod && (
                        <Typography color="error">
                            {errors.deliveryMethod.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.turningMethod}
                >
                    <InputLabel>turning Method</InputLabel>
                    <Controller
                        name="turningMethod"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Select {...field} label="turning Method">
                                <MenuItem value={'Можно'}>Можно</MenuItem>
                                <MenuItem value={'Нет'}>Нет</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.turningMethod && (
                        <Typography color="error">
                            {errors.turningMethod.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.paymentMethod}
                >
                    <InputLabel>payment Method</InputLabel>
                    <Controller
                        name="paymentMethod"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Select {...field} label="payment Method">
                                <MenuItem value={'На карту'}>На карту</MenuItem>
                                <MenuItem value={'Налом'}>Налом</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.paymentMethod && (
                        <Typography color="error">
                            {errors.paymentMethod.message}
                        </Typography>
                    )}
                </FormControl>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Category"
                            fullWidth
                            margin="normal"
                            error={!!errors.category}
                            helperText={
                                errors.category ? errors.category.message : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="subcategory"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Subcategory"
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
                <Controller
                    name="weight"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Weight"
                            type="text"
                            fullWidth
                            margin="normal"
                            error={!!errors.weight}
                            helperText={
                                errors.weight ? errors.weight.message : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="height"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Height"
                            type="text"
                            fullWidth
                            margin="normal"
                            error={!!errors.height}
                            helperText={
                                errors.height ? errors.height.message : ''
                            }
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isPending}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </Button>
                {isError && (
                    <Typography color="error">
                        Error: {error?.message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CreateForm;