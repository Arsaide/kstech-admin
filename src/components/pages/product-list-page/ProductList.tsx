import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Context } from '../../../main.tsx';
import { AuthContext } from '../../../lib/providers/AuthProvider.tsx';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './subcomponents/product-card/ProductCard.tsx';
import './ProductList.css';

const ProductList = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
    }, [currentPage, setSearchParams]);

    const { isLoading, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
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
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imgArr={item.imgArr}
                            />
                        ))}
                </div>
            )}
            <span>Current Page: {currentPage}</span>
            <button
                onClick={() => {
                    const newPage = Math.max(currentPage - 1, 1);
                    setSearchParams({ page: newPage.toString() });
                }}
                disabled={currentPage === 1}
            >
                Previous Page
            </button>{' '}
            <button
                onClick={() => {
                    if (!isPlaceholderData && data) {
                        const newPage = currentPage + 1;
                        setSearchParams({ page: newPage.toString() });
                    }
                }}
                disabled={isPlaceholderData || !data}
            >
                Next Page
            </button>
            {isFetching ? <span> Loading...</span> : null}{' '}
        </div>
    );
};

export default ProductList;
