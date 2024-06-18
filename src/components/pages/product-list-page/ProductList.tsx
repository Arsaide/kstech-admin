import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../utils/providers/AuthProvider.tsx';
import ProductCard from './subcomponents/product-card/ProductCard.tsx';
import './ProductList.css';
import { Alert, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import { ProductListStyles } from './ProductList.styles.ts';
import ProductsListSkeleton from './subcomponents/products-list-skeleton/ProductsListSkeleton.tsx';
import { Context } from '../../../api/context.ts';

const ProductList = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleChangePagination = (
        _event: ChangeEvent<unknown>,
        page: number,
    ) => {
        setCurrentPage(page);
    };

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => store.getProductsList(currentPage),
        select: data => data.data,
        enabled: isLoggedIn,
    });

    return (
        <div>
            {isLoading ? (
                <ProductsListSkeleton />
            ) : isError ? (
                <Alert variant="filled" severity="error">
                    Error: {error.message}
                </Alert>
            ) : (
                <div className={'cardsList'}>
                    {data &&
                        data.products.map(item => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imgArr={item.imgArr}
                            />
                        ))}
                </div>
            )}
            <Box sx={ProductListStyles.pagination}>
                <Pagination
                    count={data ? data.totalPages : 1}
                    onChange={handleChangePagination}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default ProductList;
