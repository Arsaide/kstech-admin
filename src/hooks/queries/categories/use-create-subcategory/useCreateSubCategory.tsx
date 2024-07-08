import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Context } from '../../../../api/context';
import { toast } from 'react-toastify';
import { CreateSubcategoryResponseModel } from '../../../../api/models/CategoriesResponseModel';

const useCreateSubCategory = (
    originalImage: File | null,
    resizedImage: File | null,
) => {
    const { store } = useContext(Context);

    const {
        mutate: createSubcategoryMutate,
        isPending: isPendingCreateSubcategory,
        isError: isCreateSubcategoryError,
        error: mutateSubcategoryError,
    } = useMutation({
        mutationKey: ['create-subcategory'],
        mutationFn: async (subcategory: CreateSubcategoryResponseModel) =>
            store.addSubcategory(
                subcategory.category,
                subcategory.subcategory,
                originalImage,
                resizedImage,
            ),
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
