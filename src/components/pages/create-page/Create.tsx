import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../../../providers/CategoriesProvider';
import { Alert } from '@mui/material';
import CreateSubcategoryForm from './category/categories-form/CreateSubcategoryForm';
import CreateCategoryForm from './category/categories-form/CreateCategoryForm';
import CreateProductForm from './product/create-product-form/CreateProductForm';

const Create = () => {
    const { isVisibleSubcategories } = useContext(CategoriesContext);
    const [isVisibleCategoriesForm, setIsVisibleCategoriesForm] =
        useState<boolean>(false);

    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can create a product
            </Alert>
            {isVisibleCategoriesForm ? (
                <>
                    {isVisibleSubcategories ? (
                        <CreateSubcategoryForm />
                    ) : (
                        <CreateCategoryForm />
                    )}
                </>
            ) : (
                <CreateProductForm />
            )}
        </>
    );
};

export default Create;
