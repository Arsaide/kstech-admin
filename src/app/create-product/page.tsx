import { Alert } from '@mui/material';
import CreateProduct from '../../components/pages/create-product/CreateProduct';

const CreateProductPage = () => {
    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can create a product
            </Alert>
            <CreateProduct />
        </>
    );
};

export default CreateProductPage;
