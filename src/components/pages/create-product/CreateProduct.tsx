import React, { useContext } from 'react';
import CreateForm from './create-form/CreateForm';
import { Context } from '../../../api/context';
import { AuthContext } from '../../../utils/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CreateProductDataType } from '../../../types/forms/CreateProductData.type';

const CreateProduct = () => {
    const { store } = useContext(Context);
    const { setIsLoggedIn } = useContext(AuthContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateProductDataType>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: async (product: CreateProductDataType) =>
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
        onSuccess: () => setIsLoggedIn(true),
    });

    const onSubmit = (data: CreateProductDataType) => {
        mutate(data);
        console.log(data);
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
