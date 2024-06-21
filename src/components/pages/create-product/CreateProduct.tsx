import React, { useContext } from 'react';
import CreateForm from './create-form/CreateForm';
import { Context } from '../../../api/context';
import { AuthContext } from '../../../utils/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ProductDataTypes } from '../../../types/forms/ProductData.types';
import { toast } from 'react-toastify';

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
                product.discounts,
                product.inAvailability,
                product.category,
                product.subcategory,
                product.weight,
                product.height,
                product.deliveryMethod,
                product.turningMethod,
                product.paymentMethod,
            ),
        onSuccess: () => toast.success('Створення успішне!'),
        onError: e => toast.error(`Сталась помилка ${e}`),
    });

    const onSubmit = (data: ProductDataTypes) => {
        mutate(data);
    };

    return (
        <div>
            <CreateForm
                handleSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
                isPending={isPending}
                isError={isError}
                error={error}
            />
        </div>
    );
};

export default CreateProduct;
