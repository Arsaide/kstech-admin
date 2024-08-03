import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../../../api/context';
import { Controller, useForm } from 'react-hook-form';
import { ProductDataTypes } from '../../../../../../types/forms/ProductData.types';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { OneProductTypes } from '../../../../../../api/models/ProductResponseModel';
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControl,
    IconButton,
    InputAdornment,
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
import { useGetOneCategory } from '../../../../../../hooks/queries/categories/use-get-one-category/useGetOneCategory';
import useGetAllCategories from '../../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import { SubcategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import { Palette, Plus, ReceiptText } from 'lucide-react';
import { ChromePicker, ColorResult } from 'react-color';

interface ProductIdEditProps {
    data: OneProductTypes;
}

const ProductIdEdit: FC<ProductIdEditProps> = ({ data }) => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        data.category || null,
    );
    const [subcategories, setSubcategories] = useState<
        SubcategoryResponseModel[] | null
    >(null);
    const [currentColor, setCurrentColor] = useState<string>('#fff');
    const [currentTurning, setCurrentTurning] = useState<string>('');

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        getValues,
    } = useForm<ProductDataTypes<string[], string[]>>({
        defaultValues: {
            name: data.name || '',
            colors: data.colors || '',
            price: data.price || '',
            discount: data.discount || '0',
            inAvailability: data.inAvailability || '',
            deliveryMethod: data.deliveryMethod || [],
            turningMethod: data.turningMethod || [],
            paymentMethod: data.paymentMethod || [],
            category: data.category || '',
            subcategory: data.subcategory || '',
            weight: data.weight || '',
            height: data.height || '',
            width: data.width || '',
            long: data.long || '',
            country: data.country || ''
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['edit-product'],
        mutationFn: async (product: ProductDataTypes<string[], string[]>) =>
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
                product.country,
                product.deliveryMethod,
                product.turningMethod,
                product.paymentMethod,
            ),
        onError: e => toast.error(`Сталась помилка ${e}`),
        onSuccess: () => {
            location.reload();
        },
    });

    const { categoriesData } = useGetAllCategories();

    const {
        categoryData,
        isLoadingGetCategory,
        isGetCategoryError,
        getCategoryError,
    } = useGetOneCategory(selectedCategoryId);

    useEffect(() => {
        if (categoryData && data.id) {
            setSubcategories(categoryData.data.subcategory);

            if (data.subcategory) {
                setValue('subcategory', data.subcategory);
            }
        }
    }, [categoryData, data.subcategory, categoriesData, setValue]);

    const handleCategorySelected = (event: SelectChangeEvent<string>) => {
        const id = event.target.value;
        setSelectedCategoryId(id);
    };

    useEffect(() => {
        if (data.description) {
            const contentState = convertFromRaw(JSON.parse(data.description));
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [data.description]);

    const handleAddColor = () => {
        const colors: string[] = getValues('colors');
        setValue('colors', [...colors, currentColor]);
    };

    const handleRemoveColor = (id: string) => {
        const colors: string[] = getValues('colors').filter(
            (_, i) => i.toString() !== id,
        );
        setValue('colors', colors);
    };

    const handleAddTurning = () => {
        const turning: string[] = getValues('turningMethod');
        setValue('turningMethod', [...turning, currentTurning]);
        setCurrentTurning('');
    };

    const handleRemoveTurning = (id: string) => {
        const turning: string[] = getValues('turningMethod').filter(
            (_, i) => i.toString() !== id,
        );
        setValue('turningMethod', turning);
    };

    const onSubmit = (data: ProductDataTypes<string[], string[]>) => {
        const formattedDescription = JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
        );
        const productData = {
            ...data,
            description: formattedDescription,
        };
        mutate(productData);
    };

    useEffect(() => {
        if (selectedCategoryId) {
            setSelectedCategoryId(selectedCategoryId);
        }
    }, [selectedCategoryId]);

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
                sx={{ maxWidth: '800px', width: '100%' }}
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
                <Box>
                    <Typography sx={{ mt: 2 }}>
                        <Palette size={18} />
                        Додати колір
                    </Typography>
                    <Controller
                        name={'colors'}
                        control={control}
                        render={({ field }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    mb: 1,
                                    mt: 1,
                                }}
                            >
                                {field.value.map((color, id) => (
                                    <Chip
                                        key={id}
                                        label={color}
                                        onDelete={() =>
                                            handleRemoveColor(`${id}`)
                                        }
                                        sx={{
                                            backgroundColor: color,
                                            color: '#fff',
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    />
                    <ChromePicker
                        color={currentColor}
                        disableAlpha={true}
                        onChangeComplete={(color: ColorResult) =>
                            setCurrentColor(color.hex)
                        }
                    />
                    <Box sx={{ mt: 1, mb: 2 }}>
                        <Button
                            variant={'outlined'}
                            color={'secondary'}
                            onClick={handleAddColor}
                        >
                            Додати колір
                        </Button>
                    </Box>
                </Box>
                <Controller
                    name={'description'}
                    control={control}
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextEditorInput
                            editorState={editorState}
                            onEditorStateChange={newState => {
                                setEditorState(newState);
                                const rawContentState = JSON.stringify(
                                    convertToRaw(newState.getCurrentContent()),
                                );
                                field.onChange(rawContentState);
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
                <Box sx={{ mb: 3, mt: 3 }}>
                    <Typography sx={{ mt: 2 }}>
                        <ReceiptText size={18} />
                        Додати сервісні обслуговування і умови
                    </Typography>
                    <Controller
                        name="turningMethod"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    mt: 1,
                                }}
                            >
                                {field.value.map((turning, id) => (
                                    <Chip
                                        key={id}
                                        label={turning}
                                        onDelete={() => {
                                            handleRemoveTurning(`${id}`);
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    />
                    <TextField
                        label="Сервісне обслуговування, умови повернення"
                        fullWidth
                        margin="normal"
                        error={!!errors.turningMethod}
                        helperText={
                            errors.turningMethod
                                ? errors.turningMethod.message
                                : ''
                        }
                        value={currentTurning}
                        onChange={e => {
                            setCurrentTurning(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleAddTurning}>
                                        <Plus size={30} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
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
                    disabled={isLoadingGetCategory}
                >
                    <InputLabel>Категорія</InputLabel>
                    <Controller
                        name={'category'}
                        control={control}
                        defaultValue={data?.category}
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
                                disabled={
                                    !selectedCategoryId || isLoadingGetCategory
                                }
                            >
                                {subcategories?.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                        {item.subcategory}
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
                {isGetCategoryError && (
                    <Typography color="error">
                        Помилка: {getCategoryError?.message}
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
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: 'Required field' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Країна виробник"
                                type="text"
                                fullWidth
                                margin="normal"
                                error={!!errors.country}
                                helperText={
                                    errors.country ? errors.country.message : ''
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
