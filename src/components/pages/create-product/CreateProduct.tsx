import React, { ChangeEvent, useContext, useState } from 'react';
import { Context } from '../../../api/context';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ProductDataTypes } from '../../../types/forms/ProductData.types';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ImageUploadManager from '../../layout/common/ui/form-inputs/image-upload-manager/ImageUploadManager';
import {
    deliveryMethodArr,
    inAvailabilityArr,
    paymentMethodArr,
} from '../product-list-page/product-id-page/components/product-id-edit';
import { convertToRaw, EditorState } from 'draft-js';
import TextEditorInput from '../../layout/common/ui/custom-components/text-editor-input/TextEditorInput';

const CreateProduct = () => {
    const { store } = useContext(Context);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductDataTypes>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: async (product: ProductDataTypes) =>
            store.createProduct(
                product.name,
                product.imgArr,
                product.colors,
                product.description,
                product.price,
                product.discount,
                product.inAvailability,
                product.category,
                product.subcategory,
                product.weight,
                product.height,
                product.width,
                product.long,
                product.deliveryMethod,
                product.turningMethod,
                product.paymentMethod,
            ),
        onError: e => toast.error(`Сталась помилка ${e}`),
    });

    const onSubmit = (data: ProductDataTypes) => {
        const formattedDescription = JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
        );
        const productData = {
            ...data,
            description: formattedDescription,
        };
        mutate(productData);
    };

    return (
        <Box>
            <Typography variant={'h4'}>Форма створення товару.</Typography>
            <Typography variant={'h5'}>
                Перед відправленням перевірте всі поля!
            </Typography>

            <Box
                component={'form'}
                onSubmit={handleSubmit(onSubmit)}
                sx={{ maxWidth: '600px', width: '100%' }}
            >
                <Typography variant={'h5'} sx={{ mt: 2 }}>
                    Медіа товару:
                </Typography>
                <Controller
                    name="imgArr"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <>
                            <ImageUploadManager
                                field={field}
                                label={
                                    'Завантажте або перетягніть сюди зображення товару'
                                }
                            />
                            {errors.imgArr && (
                                <p style={{ color: 'red' }}>
                                    {errors.imgArr.message}
                                </p>
                            )}
                        </>
                    )}
                />
                <Typography variant={'h5'} sx={{ mt: 2 }}>
                    Основна інформація товару:
                </Typography>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Назва товару"
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
                        <>
                            <TextField
                                {...field}
                                label="Можливий колір товару (Через кому)"
                                fullWidth
                                margin="normal"
                                error={!!errors.colors}
                                helperText={
                                    errors.colors ? errors.colors.message : ''
                                }
                            />
                            <p className={'hint'}>
                                <i>
                                    *Підказка: жовтий, красний, зелений, синій
                                </i>
                            </p>
                        </>
                    )}
                />
                <Controller
                    name={'description'}
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextEditorInput
                            editorState={editorState}
                            onEditorStateChange={newState => {
                                setEditorState(newState);
                                field.onChange(newState);
                            }}
                            placeholder={'Опис товару'}
                            error={!!errors.description}
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
                            label="Ціна товару в гривнях. Без знижки"
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
                    name="discount"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => {
                        const handleChange = (
                            event: ChangeEvent<HTMLInputElement>,
                        ) => {
                            const value = event.target.value;
                            const numericValue = Math.min(Number(value), 100);
                            field.onChange(numericValue);
                        };

                        return (
                            <>
                                <TextField
                                    {...field}
                                    label="Знижка на товар у відсотках"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.discount}
                                    helperText={
                                        errors.discount
                                            ? errors.discount.message
                                            : ''
                                    }
                                    value={field.value}
                                    onChange={handleChange}
                                />
                                <p className={'hint'}>
                                    <i>
                                        *Підказка: 0 - немає знижки; 100 -
                                        максимальна знижка. <br />
                                        Всі значення автоматично конверуються у
                                        відсотки
                                    </i>
                                </p>
                            </>
                        );
                    }}
                />
                <Typography variant={'h5'} sx={{ mt: 3 }}>
                    Послуги та наявність товару:
                </Typography>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.inAvailability}
                >
                    <InputLabel>Наявність</InputLabel>
                    <Controller
                        name="inAvailability"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Select {...field} label="Наявність">
                                {inAvailabilityArr.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.inAvailability && (
                        <p className={'fieldError'}>
                            {errors.inAvailability.message}
                        </p>
                    )}
                </FormControl>
                <Controller
                    name={'deliveryMethod'}
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => {
                        const handleChange = (
                            event: SelectChangeEvent<string[]>,
                        ) => {
                            const value = event.target.value as string[];
                            if (value.includes('Тільки самовивіз')) {
                                field.onChange(['Тільки самовивіз']);
                            } else {
                                field.onChange(value);
                            }
                        };

                        return (
                            <FormControl
                                fullWidth
                                margin="normal"
                                error={!!errors.deliveryMethod}
                            >
                                <InputLabel id={'deliveryMethod'}>
                                    Способи доставки товару
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId={'deliveryMethod'}
                                    label={'Способи доставки товару'}
                                    multiple
                                    renderValue={selected =>
                                        selected.join(', ')
                                    }
                                    onChange={handleChange}
                                >
                                    {deliveryMethodArr.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            <Checkbox
                                                checked={
                                                    field.value.indexOf(item) >
                                                    -1
                                                }
                                            />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.deliveryMethod && (
                                    <p className={'fieldError'}>
                                        {errors.deliveryMethod.message}
                                    </p>
                                )}
                            </FormControl>
                        );
                    }}
                />
                <Controller
                    name="turningMethod"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                label="Сервісне обслуговування, умови повернення (Через кому)"
                                fullWidth
                                margin="normal"
                                error={!!errors.turningMethod}
                                helperText={
                                    errors.turningMethod
                                        ? errors.turningMethod.message
                                        : ''
                                }
                            />
                            <p className={'hint'}>
                                <i>
                                    *Підказка: 3 роки гарантії, 60 днів на
                                    повернення
                                </i>
                            </p>
                        </>
                    )}
                />
                <Controller
                    name={'paymentMethod'}
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={!!errors.inAvailability}
                        >
                            <InputLabel id={'paymentMethod'}>
                                Способи оплати
                            </InputLabel>
                            <Select
                                {...field}
                                labelId={'paymentMethod'}
                                label={'Способи оплати'}
                                multiple
                                renderValue={selected => selected.join(', ')}
                            >
                                {paymentMethodArr.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(item) > -1
                                            }
                                        />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.paymentMethod && (
                                <p className={'fieldError'}>
                                    {errors.paymentMethod.message}
                                </p>
                            )}
                        </FormControl>
                    )}
                />
                <Typography variant={'h5'} sx={{ mt: 3 }}>
                    Категорії та розташування товару:
                </Typography>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                label="Категорія товару"
                                fullWidth
                                margin="normal"
                                error={!!errors.category}
                                helperText={
                                    errors.category
                                        ? errors.category.message
                                        : ''
                                }
                            />
                            <p className={'hint'}>
                                <i>
                                    *Підказка: Категорія:
                                    &ldquo;Електрогенератори&ldquo;
                                </i>
                            </p>
                        </>
                    )}
                />
                <Controller
                    name="subcategory"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                label="Підкатегорія товару"
                                fullWidth
                                margin="normal"
                                error={!!errors.subcategory}
                                helperText={
                                    errors.subcategory
                                        ? errors.subcategory.message
                                        : ''
                                }
                            />
                            <p className={'hint'}>
                                <i>
                                    *Підказка: Підкатегорія: &ldquo;Бензинові
                                    генератори&ldquo;
                                </i>
                            </p>
                        </>
                    )}
                />
                <Typography variant={'h5'} sx={{ mt: 3 }}>
                    Характеристики товару:
                </Typography>
                <Box
                    sx={{
                        '& > :not(style)': { flex: '0 0 49.5%' },
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                    }}
                >
                    <Controller
                        name="weight"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Вага товару (кг)"
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
                                label="Висота (м)"
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
                    <Controller
                        name="width"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Ширина (м)"
                                type="text"
                                fullWidth
                                margin="normal"
                                error={!!errors.width}
                                helperText={
                                    errors.width ? errors.width.message : ''
                                }
                            />
                        )}
                    />
                    <Controller
                        name="long"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Довжина (м)"
                                type="text"
                                fullWidth
                                margin="normal"
                                error={!!errors.long}
                                helperText={
                                    errors.long ? errors.long.message : ''
                                }
                            />
                        )}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isPending}
                >
                    {isPending ? 'Обробка запиту...' : 'Створити товар'}
                </Button>
                {isError && (
                    <Typography color="error">
                        Помилка: {error?.message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CreateProduct;
