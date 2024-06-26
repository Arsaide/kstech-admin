import { Alert } from '@mui/material';
import CreateProduct from '../../components/pages/create-product/CreateProduct';
import CategoriesForm from '../../components/pages/create-product/categories-form/CategoriesForm';
import SubcategoriesForm from '../../components/pages/create-product/categories-form/SubcategoriesForm';

const CreateProductPage = () => {
    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can create a product
            </Alert>

            <CategoriesForm />
            <SubcategoriesForm />

            <CreateProduct />
        </>
    );
};

export default CreateProductPage;
