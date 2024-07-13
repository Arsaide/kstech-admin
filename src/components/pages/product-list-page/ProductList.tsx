import { useMutation, useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './ProductList.css';
import {
    Alert,
    IconButton,
    InputAdornment,
    Pagination,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';

import { useSearchParams } from 'react-router-dom';
import { Context } from '../../../api/context';
import { AuthContext } from '../../../providers/AuthProvider';
import ProductsListSkeleton from './subcomponents/products-list-skeleton/ProductsListSkeleton';
import { ProductListStyles } from './ProductList.styles';
import {
    AllProductResponseModel,
    OneProductTypes,
} from '../../../api/models/ProductResponseModel';
import ProductCard from './subcomponents/product-card/ProductCard';
import { Controller, useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { SearchDataTypes } from '../../../types/Search.types';
import { AxiosResponse } from 'axios';

const ProductList = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchProductInput, setSearchProductInput] = useState<string>('');

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SearchDataTypes>();

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
    });

    const {
        isPending,
        isError: IsMutateError,
        error: mutateError,
        mutate,
        data: mutateData,
    } = useMutation<AxiosResponse<AllProductResponseModel>>({
        mutationKey: ['search-products', currentPage, searchProductInput],
        mutationFn: () => store.searchProducts(currentPage, searchProductInput),
    });

    const onSubmit = () => {
        mutate();
    };

    const displayedData = mutateData ? mutateData.data : data ? data : null;

    console.log(displayedData);

    return (
        <div>
            {isLoading ? (
                <ProductsListSkeleton />
            ) : isError ? (
                <Alert variant="filled" severity="error">
                    Error: {error.message}
                </Alert>
            ) : (
                <div>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name={'search'}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={'Пошук товарів'}
                                    fullWidth
                                    margin={'normal'}
                                    value={searchProductInput}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setSearchProductInput(e.target.value);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton type={'submit'}>
                                                    <Plus size={30} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <div className={'cardsList'}>
                        {displayedData &&
                            Array.isArray(displayedData.products) &&
                            displayedData.products.map(
                                (item: OneProductTypes) => (
                                    <ProductCard
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        imgArr={item.imgArr}
                                    />
                                ),
                            )}
                    </div>
                </div>
            )}
            <Box sx={ProductListStyles.pagination}>
                <Pagination
                    count={displayedData ? displayedData.totalPages : 1}
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
