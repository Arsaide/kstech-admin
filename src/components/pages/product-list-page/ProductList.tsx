import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../utils/providers/AuthProvider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string | null>('1');
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');
        setCurrentPage(page);
    }, [location.search]);

    const handleChangePagination = (
        _event: ChangeEvent<unknown>,
        page: number,
    ) => {
        setCurrentPage(page.toString());
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page.toString());
        navigate(`${location.pathname}?${searchParams.toString()}`);

        localStorage.setItem('ProductListPage', page.toString());
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
