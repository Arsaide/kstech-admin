import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { ProductDataTypes } from '../../../../types/forms/ProductData.types';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Context } from '../../../../api/context';

const useCreateProduct = () => {
    const queryClient: QueryClient = useQueryClient();
    const { store } = useContext(Context);

    const { mutate, isPending, isError, error, isSuccess } = useMutation({
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
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['products'] });
            queryClient.resetQueries({ queryKey: ['search-products'] });
        },
    });

    return { mutate, isPending, isError, error, isSuccess };
};

export default useCreateProduct;
