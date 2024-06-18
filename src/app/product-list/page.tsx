import ProductList from '../../components/pages/product-list-page/ProductList.tsx';
import { Alert } from '@mui/material';

const ProductListPage = () => {
    return (
        <>
            <Alert sx={{ mb: 2 }} variant="filled" severity="info">
                Here you are can view products list
            </Alert>
            <ProductList />
        </>
    );
};

export default ProductListPage;
