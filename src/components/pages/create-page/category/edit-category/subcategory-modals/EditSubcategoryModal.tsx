import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Context } from '../../../../../../api/context';
import { useResizeImages } from '../../../../../../hooks/use-resize-images/useResizeImages';
import { Controller, useForm } from 'react-hook-form';
import { EditCategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Box, Button, TextField, Typography } from '@mui/material';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';
import { Pencil } from 'lucide-react';
import { styled } from '@mui/system';

const Input = styled('input')({
    display: 'none',
});

interface EditSubcategoryModalProps {
    id: string | null;
    name: string;
    iconImg: string;
    mainImg: string;
}

const EditSubcategoryModal: FC<EditSubcategoryModalProps> = ({
    id,
    name,
    iconImg,
    mainImg,
}) => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);
    const [toggleName, setToggleName] = useState<boolean>(false);
    const [toggleImage, setToggleImage] = useState<boolean>(false);
    const { originalImage, resizedImage, handleImageChange, resetImages } =
        useResizeImages();

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
    } = useForm<EditCategoryResponseModel>({
        defaultValues: {
            newName: '',
            img: undefined,
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['change-subcategory'],
        mutationFn: async (category: EditCategoryResponseModel) => {
            await store.editSubcategory(
                id,
                originalImage,
                resizedImage,
                category.newName,
            );
        },
        onError: e =>
            toast.error(`Сталась помилка при створені категорії: ${e}`),
        onSuccess: () => {
            setToggleName(true);
            reset({
                newName: '',
                img: undefined,
            });
            queryClient.resetQueries({ queryKey: ['get-one-category'] });
        },
    });

    const onSubmit = (data: EditCategoryResponseModel) => {
        mutate(data);
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <p
                className={'modalHint'}
                style={{ color: MainColorsEnum.BLACK05, marginBottom: '5px' }}
            >
                id: {id}
            </p>
            <div className={'modalNameCnt'}>
                {toggleName ? (
                    <>
                        <Controller
                            name={'newName'}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={'Нова назва'}
                                    margin={'normal'}
                                    error={!!errors.newName}
                                    helperText={
                                        errors.newName
                                            ? errors.newName.message
                                            : ''
                                    }
                                />
                            )}
                        />
                        <Button
                            type={'submit'}
                            variant="contained"
                            disabled={isPending}
                        >
                            {isPending ? 'Зміна...' : 'Змінити назву'}
                        </Button>
                    </>
                ) : (
                    <div className={'modalName'}>
                        <p className={'modalNameHint'}>Поточна назва</p>
                        <Typography variant={'body1'}>{name}</Typography>
                    </div>
                )}
                <div
                    className={'modalIcon'}
                    onClick={() => setToggleName(!toggleName)}
                >
                    <Pencil size={30} />
                </div>
            </div>
            <Box>
                {toggleImage ? (
                    <Box>
                        <Typography variant={'h6'}>Зміна зображеннь</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                gap: 2,
                            }}
                        >
                            <Controller
                                name={'img'}
                                control={control}
                                rules={{ required: 'Required field' }}
                                render={({ field }) => (
                                    <label htmlFor="file-input">
                                        <Input
                                            accept="image/*"
                                            id="file-input"
                                            type="file"
                                            onChange={e => {
                                                handleImageChange(
                                                    e as ChangeEvent<HTMLInputElement>,
                                                    field.onChange,
                                                );
                                                field.onChange(
                                                    e.target.files?.[0] ?? null,
                                                );
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                        >
                                            Завантажити файл
                                        </Button>
                                    </label>
                                )}
                            />
                            <Button
                                type={'submit'}
                                variant="outlined"
                                disabled={isPending}
                            >
                                {isPending ? 'Зміна...' : 'Змінити картинки'}
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            {resizedImage && (
                                <Box>
                                    <p className={'modalHintImgSize'}>
                                        126 x 126
                                    </p>
                                    <img
                                        src={URL.createObjectURL(resizedImage)}
                                        alt="Resized"
                                    />
                                </Box>
                            )}
                            {originalImage && (
                                <Box>
                                    <p className={'modalHintImgSize'}>
                                        726 x 726
                                    </p>
                                    <img
                                        src={URL.createObjectURL(originalImage)}
                                        alt="Original"
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Typography variant={'h6'}>
                            Поточні зображення
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Box>
                                <p className={'modalHintImgSize'}>126 x 126</p>
                                <img src={iconImg} alt={name} />
                            </Box>
                            <Box>
                                <p className={'modalHintImgSize'}>726 x 726</p>
                                <img src={mainImg} alt={name} />
                            </Box>
                        </Box>
                    </>
                )}
                <Box>
                    <Typography>
                        {toggleName
                            ? 'Повернутись до поточних зображень'
                            : 'Змінити зображення'}
                    </Typography>
                    <div
                        className={'modalIcon'}
                        onClick={() => {
                            setToggleImage(!toggleImage);
                            setValue('img', null);
                            resetImages();
                        }}
                    >
                        <Pencil size={30} />
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default EditSubcategoryModal;
