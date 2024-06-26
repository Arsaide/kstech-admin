import { Alert } from '@mui/material';
import CreateProduct from '../../components/pages/create-product/CreateProduct';
import CategoriesForm from '../../components/pages/create-product/categories-form/CategoriesForm';
import SubcategoriesForm from '../../components/pages/create-product/categories-form/SubcategoriesForm';
import { useContext } from 'react';
import { CategoriesContext } from '../../utils/providers/CategoriesProvider';

const CreateProductPage = () => {
    const { isVisibleSubcategories } = useContext(CategoriesContext);

    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can create a product
            </Alert>
            {isVisibleSubcategories ? (
                <SubcategoriesForm />
            ) : (
                <CategoriesForm />
            )}

            <CreateProduct />
        </>
    );
};

export default CreateProductPage;
