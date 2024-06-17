import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ChangeEvent, useContext, useEffect } from 'react';
import { Context } from '../../../main.tsx';
import { AuthContext } from '../../../lib/providers/AuthProvider.tsx';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './subcomponents/product-card/ProductCard.tsx';
import './ProductList.css';
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';

const ProductList = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
    }, [currentPage, setSearchParams]);

    const handleChangePagination = (
        _event: ChangeEvent<unknown>,
        page: number,
    ) => {
        setSearchParams({ page: page.toString() });
        localStorage.setItem('ProductListPage', page.toString());
    };

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => store.getProductsList(currentPage),
        select: data => data.data,
        enabled: isLoggedIn,
        placeholderData: keepPreviousData,
    });

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Pagination
                    count={data ? data.totalPages : 1}
                    onChange={handleChangePagination}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
        </div>
    );
};

export default ProductList;
