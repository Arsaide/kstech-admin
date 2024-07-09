import { useContext } from 'react';
import { Context } from '../../../../api/context';
import { useQuery } from '@tanstack/react-query';

export const useGetOneCategory = (categoryId: string | null) => {
    const { store } = useContext(Context);

    const {
        data: categoryData,
        isLoading: isLoadingGetCategory,
        isError: isGetCategoryError,
        error: getCategoryError,
    } = useQuery({
        queryKey: ['get-one-category', categoryId],
        queryFn: async () => await store.getOneCategory(categoryId),
        enabled: !!categoryId,
    });

    return {
        categoryData,
        isLoadingGetCategory,
        isGetCategoryError,
        getCategoryError,
    };
};
