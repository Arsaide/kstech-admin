import React, { ChangeEvent, useContext } from 'react';
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

const CreateProduct = () => {
    const { store } = useContext(Context);

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
        mutate(data);
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
                    name="description"
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Опис товару"
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
                            <Select {...field} label="In Availability">
                                <MenuItem value={'В наявності'}>
                                    В наявності
                                </MenuItem>
                                <MenuItem value={'Під замовлення'}>
                                    Під замовлення
                                </MenuItem>
                                <MenuItem value={'Немає в наявності'}>
                                    Немає в наявності
                                </MenuItem>
                            </Select>
                        )}
                    />
                    {errors.inAvailability && (
                        <Typography color="error">
                            {errors.inAvailability.message}
                        </Typography>
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
                                    <MenuItem value={'Нова пошта'}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(
                                                    'Нова пошта',
                                                ) > -1
                                            }
                                        />
                                        <ListItemText primary={'Нова пошта'} />
                                    </MenuItem>
                                    <MenuItem value={"Кур'єр Нова Пошта"}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(
                                                    "Кур'єр Нова Пошта",
                                                ) > -1
                                            }
                                        />
                                        <ListItemText
                                            primary={"Кур'єр Нова Пошта"}
                                        />
                                    </MenuItem>
                                    <MenuItem value={'Укр пошта'}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(
                                                    'Укр пошта',
                                                ) > -1
                                            }
                                        />
                                        <ListItemText primary={'Укр пошта'} />
                                    </MenuItem>
                                    <MenuItem value={'Тільки самовивіз'}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(
                                                    'Тільки самовивіз',
                                                ) > -1
                                            }
                                        />
                                        <ListItemText
                                            primary={'Тільки самовивіз'}
                                        />
                                    </MenuItem>
                                </Select>
                                {errors.deliveryMethod && (
                                    <Typography color="error">
                                        {errors.deliveryMethod.message}
                                    </Typography>
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
                                <MenuItem
                                    value={
                                        "Готівкою (кур'єру, в магазині, у відділенні)"
                                    }
                                >
                                    <Checkbox
                                        checked={
                                            field.value.indexOf(
                                                "Готівкою (кур'єру, в магазині, у відділенні)",
                                            ) > -1
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            "Готівкою (кур'єру, в магазині, у відділенні)"
                                        }
                                    />
                                </MenuItem>
                                <MenuItem
                                    value={
                                        'Оплата частинами від ПриватБанк або Монобанку'
                                    }
                                >
                                    <Checkbox
                                        checked={
                                            field.value.indexOf(
                                                'Оплата частинами від ПриватБанк або Монобанку',
                                            ) > -1
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            'Оплата частинами від ПриватБанк або Монобанку'
                                        }
                                    />
                                </MenuItem>
                                <MenuItem
                                    value={
                                        'Безготівковий розрахунок для юр.осіб'
                                    }
                                >
                                    <Checkbox
                                        checked={
                                            field.value.indexOf(
                                                'Безготівковий розрахунок для юр.осіб',
                                            ) > -1
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            'Безготівковий розрахунок для юр.осіб'
                                        }
                                    />
                                </MenuItem>
                                <MenuItem
                                    value={
                                        'Оплата на карту через VISA, Private24, Apple Pay, Google Pay, MasterCard'
                                    }
                                >
                                    <Checkbox
                                        checked={
                                            field.value.indexOf(
                                                'Оплата на карту через VISA, Private24, Apple Pay, Google Pay, MasterCard',
                                            ) > -1
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            'Оплата на карту через VISA, Private24, Apple Pay, Google Pay, MasterCard'
                                        }
                                    />
                                </MenuItem>
                            </Select>
                            {errors.paymentMethod && (
                                <Typography color="error">
                                    {errors.paymentMethod.message}
                                </Typography>
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
                                label="Вага товару"
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
                                label="Висота"
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
                                label="Ширина"
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
                                label="Довжина"
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
