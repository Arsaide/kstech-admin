import { Alert } from '@mui/material';
import ProductList from "../../components/pages/product-list-page/ProductList";

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
