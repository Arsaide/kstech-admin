import React, { FC, useContext } from 'react';
import ProductIdEditForm from '../../product-id-edit-form/ProductIdEditForm';
import { Context } from '../../../../../../api/context';
import { useForm } from 'react-hook-form';
import { ProductDataTypes } from '../../../../../../types/forms/ProductData.types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { OneProductResponseModel } from '../../../../../../api/models/ProductResponseModel';

interface ProductIdEditProps {
    data: OneProductResponseModel;
}

const ProductIdEdit: FC<ProductIdEditProps> = ({ data }) => {
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
            <ProductIdEditForm
                handleSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
                isPending={isPending}
                isError={isError}
                error={error}
                data={data}
            />
        </div>
    );
};

export default ProductIdEdit;
