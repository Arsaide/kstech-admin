import { Alert } from '@mui/material';
import ProductId from '../../../components/pages/product-list-page/product-id-page/ProductId';

const ProductIdPage = () => {
    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can view or delete or change product
            </Alert>
            <ProductId />
        </>
    );
};

export default ProductIdPage;
