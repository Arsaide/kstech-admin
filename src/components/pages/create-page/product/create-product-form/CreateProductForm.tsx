import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../../api/context';
import { convertToRaw, EditorState } from 'draft-js';
import { Controller, useForm } from 'react-hook-form';
import {
    ColorTypes,
    ProductDataTypes,
    TurningTypes,
} from '../../../../../types/forms/ProductData.types';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
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
import Typography from '@mui/material/Typography';
import ImageUploadManager from '../../../../layout/common/form-inputs/image-upload-manager/ImageUploadManager';
import TextEditorInput from '../../../../layout/common/form-inputs/text-editor-input/TextEditorInput';
import {
    deliveryMethodArr,
    inAvailabilityArr,
    paymentMethodArr,
} from '../../../product-list-page/product-id-page/components/product-id-edit';
import ListItemText from '@mui/material/ListItemText';
import { useGetOneCategory } from '../../../../../hooks/queries/categories/use-get-one-category/useGetOneCategory';
import useGetAllCategories from '../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import { SubcategoryResponseModel } from '../../../../../api/models/CategoriesResponseModel';
import { ChromePicker, ColorResult } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import { Palette, Plus, ReceiptText } from 'lucide-react';
import useCreateProduct from '../../../../../hooks/queries/products/use-create-product/useCreateProduct';

const CreateProductForm = () => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );
    const [subcategories, setSubcategories] = useState<
        SubcategoryResponseModel[] | null
    >(null);
    const [currentColor, setCurrentColor] = useState<string>('#fff');
    const [currentTurning, setCurrentTurning] = useState<string>('');

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<ProductDataTypes>({
        defaultValues: {
            colors: [] as ColorTypes[],
            turningMethod: [] as TurningTypes[],
        },
    });

    const { mutate, isPending, isError, error, isSuccess } = useCreateProduct();

    const {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    } = useGetAllCategories();

    const { categoryData, isLoadingGetCategory } =
        useGetOneCategory(selectedCategoryId);

    useEffect(() => {
        if (categoryData) {
            setSubcategories(categoryData.data.subcategory);
        }
    }, [categoryData]);

    useEffect(() => {}, [isSuccess]);

    const handleCategorySelected = (event: SelectChangeEvent<string>) => {
        const id = event.target.value;
        setSelectedCategoryId(id);
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

    const handleAddColor = () => {
        const colors: ColorTypes[] = getValues('colors');
        setValue('colors', [...colors, { id: uuidv4(), color: currentColor }]);
    };

    const handleRemoveColor = (id: string) => {
        const colors: ColorTypes[] = getValues('colors').filter(
            color => color.id !== id,
        );
        setValue('colors', colors);
    };

    const handleAddTurning = () => {
        const turning: TurningTypes[] = getValues('turningMethod');
        setValue('turningMethod', [
            ...turning,
            { id: uuidv4(), turning: currentTurning },
        ]);
        setCurrentTurning('');
    };

    const handleRemoveTurning = (id: string) => {
        const turning: TurningTypes[] = getValues('turningMethod').filter(
            index => index.toString() !== id,
        );
        setValue('turningMethod', turning);
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
                                {field.value.map(
                                    ({ id, color }: ColorTypes) => (
                                        <Chip
                                            key={id}
                                            label={color}
                                            onDelete={() =>
                                                handleRemoveColor(id)
                                            }
                                            sx={{
                                                backgroundColor: color,
                                                color: '#fff',
                                            }}
                                        />
                                    ),
                                )}
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
                                    mb: 1,
                                    mt: 1,
                                }}
                            >
                                {field.value.map(
                                    ({ id, turning }: TurningTypes) => (
                                        <Chip
                                            key={id}
                                            label={turning}
                                            onDelete={() => {
                                                handleRemoveTurning(`${id}}`);
                                                console.log(id);
                                                console.log(turning);
                                            }}
                                        />
                                    ),
                                )}
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
                                    <IconButton
                                        disabled={currentTurning == ''}
                                        onClick={handleAddTurning}
                                    >
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
                {isCategoriesError && (
                    <Typography color="error">
                        Помилка: {categoriesError?.message}
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

export default CreateProductForm;
