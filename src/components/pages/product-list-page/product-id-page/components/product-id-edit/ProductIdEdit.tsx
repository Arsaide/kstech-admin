import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../../../api/context';
import { Controller, useForm } from 'react-hook-form';
import { ProductDataTypes } from '../../../../../../types/forms/ProductData.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { OneProductTypes } from '../../../../../../api/models/ProductResponseModel';
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
import ImageUploadManager from '../../../../../layout/common/form-inputs/image-upload-manager/ImageUploadManager';
import ListItemText from '@mui/material/ListItemText';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';
import './ProductIdEdit.css';
import {
    deliveryMethodArr,
    inAvailabilityArr,
    paymentMethodArr,
} from './index';
import TextEditorInput from '../../../../../layout/common/form-inputs/text-editor-input/TextEditorInput';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

interface ProductIdEditProps {
    data: OneProductTypes;
}

const ProductIdEdit: FC<ProductIdEditProps> = ({ data }) => {
    const { store } = useContext(Context);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [subcategories, setSubcategories] = useState<string[]>([]);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<ProductDataTypes>({
        defaultValues: {
            name: data.name || '',
            colors: data.colors || '',
            price: data.price || '',
            discount: data.discount || '0',
            inAvailability: data.inAvailability || '',
            deliveryMethod: data.deliveryMethod || [],
            turningMethod: data.turningMethod || '',
            paymentMethod: data.paymentMethod || [],
            category: data.category || '',
            subcategory: data.subcategory || '',
            weight: data.weight || '',
            height: data.height || '',
            width: data.width || '',
            long: data.long || '',
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['create-page'],
        mutationFn: async (product: ProductDataTypes) =>
            store.editProduct(
                data.id,
                product.name,
                product.imgArr,
                product.oldImgArr,
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

    const {
        isLoading,
        isError: isQueryError,
        error: queryError,
        data: categoriesData,
    } = useQuery({
        queryKey: ['get-categories'],
        queryFn: async () => await store.getAllCategories(),
        select: data => data.data,
    });

    useEffect(() => {
        if (data.category) {
            setSelectedCategory(data.category);

            const category = categoriesData?.find(
                item => item.category === data.category,
            );

            setSubcategories(category?.subcategory || []);

            if (data.subcategory) {
                setValue('subcategory', data.subcategory);
            }
        }
    }, [data.category, data.subcategory, categoriesData, setValue]);

    const handleCategorySelected = (event: SelectChangeEvent<string>) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);

        const category = categoriesData?.find(
            item => item.category === selectedCategoryId,
        );
        setSubcategories(category?.subcategory || []);
    };

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
            <Typography variant={'h4'}>Форма редагування товару.</Typography>
            <Typography variant={'h5'}>
                Всі поля обов&apos;язкові. Перед відправленням перевірте всі
                поля!
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
                    name={'oldImgArr'}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={!!errors.oldImgArr}
                        >
                            <InputLabel id={'oldImgArr'}>
                                Старі зображення
                            </InputLabel>
                            <Select
                                {...field}
                                labelId={'oldImgArr'}
                                label={'Старі зображення'}
                                multiple
                                renderValue={selected => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                        }}
                                    >
                                        {selected.map(value => (
                                            <img
                                                key={value}
                                                src={value}
                                                alt={`Selected image`}
                                                style={{
                                                    width: '100px',
                                                    border: `2px solid ${MainColorsEnum.GREEN}`,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            >
                                {data.imgArr.map((img, index) => (
                                    <MenuItem key={index} value={img}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(img) > -1
                                            }
                                        />
                                        <img
                                            src={img}
                                            alt={`Зображення №${index + 1} url:${img}`}
                                            style={{
                                                width: '60px',
                                                marginRight: '10px',
                                            }}
                                        />
                                        <ListItemText
                                            primary={`Зображення №${index + 1}`}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.oldImgArr && (
                                <p style={{ color: 'red' }}>
                                    {errors.oldImgArr.message}
                                </p>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="imgArr"
                    control={control}
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
                            defaultValue={data?.name}
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
                                defaultValue={data?.colors}
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
                            defaultValue={
                                data.description
                                    ? EditorState.createWithContent(
                                          convertFromRaw(
                                              JSON.parse(data.description),
                                          ),
                                      )
                                    : EditorState.createEmpty()
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
                            defaultValue={data?.price}
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
                                    defaultValue={
                                        data?.discount
                                            ? `${data.discount}%`
                                            : '0%'
                                    }
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
                            <Select
                                {...field}
                                label="In Availability"
                                defaultValue={data ? data.inAvailability : null}
                            >
                                {inAvailabilityArr.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
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
                                defaultValue={data?.turningMethod}
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
                            <Select
                                {...field}
                                label={'Категорія'}
                                onChange={event => {
                                    handleCategorySelected(event);
                                    field.onChange(event);
                                }}
                            >
                                {categoriesData &&
                                    categoriesData.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item.category}
                                        >
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
                    defaultValue={data.subcategory || ''}
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            margin={'normal'}
                            error={!!errors.subcategory}
                        >
                            <InputLabel>Підкатегорія</InputLabel>
                            <Select
                                {...field}
                                label={'Підкатегорія'}
                                disabled={!selectedCategory}
                            >
                                {subcategories.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.subcategory && (
                                <Typography color="error">
                                    {errors.subcategory.message}
                                </Typography>
                            )}
                        </FormControl>
                    )}
                />
                {isQueryError && (
                    <Typography color="error">
                        Помилка: {queryError?.message}
                    </Typography>
                )}
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
                                defaultValue={data?.weight}
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
                                defaultValue={data?.height}
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
                                defaultValue={data?.width}
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
                                defaultValue={data?.long}
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
                    {isPending ? 'Обробка запиту...' : 'Змінити товар'}
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

export default ProductIdEdit;
