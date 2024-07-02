import { useMutation } from '@tanstack/react-query';
import { SubcategoryResponseModel } from '../../../../api/models/CategoriesResponseModel';
import { useContext } from 'react';
import { Context } from '../../../../api/context';
import { toast } from 'react-toastify';

const useCreateSubCategory = () => {
    const { store } = useContext(Context);

    const {
        mutate: createSubcategoryMutate,
        isPending: isPendingCreateSubcategory,
        isError: isCreateSubcategoryError,
        error: mutateSubcategoryError,
    } = useMutation({
        mutationKey: ['create-subcategory'],
        mutationFn: async (subcategory: SubcategoryResponseModel) =>
            store.addSubcategory(subcategory.category, subcategory.subcategory),
        onError: error => {
            toast.error(
                `Сталась помилка при створені підкатегорії: ${error.message}`,
            );
        },
    });

    return {
        createSubcategoryMutate,
        isPendingCreateSubcategory,
        isCreateSubcategoryError,
        mutateSubcategoryError,
    };
};

export default useCreateSubCategory;
