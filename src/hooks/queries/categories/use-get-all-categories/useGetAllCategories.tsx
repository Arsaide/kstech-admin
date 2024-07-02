import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Context } from '../../../../api/context';

const useGetAllCategories = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { store } = useContext(Context);

    const {
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
        data: categoriesData,
    } = useQuery({
        queryKey: ['get-categories'],
        queryFn: async () => await store.getAllCategories(),
        enabled: isLoggedIn,
        select: data => data.data,
    });

    return {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    };
};

export default useGetAllCategories;
