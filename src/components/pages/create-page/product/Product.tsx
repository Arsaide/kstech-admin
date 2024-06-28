import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import CreateProductForm from './create-product-form/CreateProductForm';
import { NavLink } from 'react-router-dom';
import '../Create.scss';

const Product = () => {
    const breadcrumbs = [
        <NavLink
            key={'1'}
            to="/create"
            className={({ isActive }) =>
                [isActive ? 'activeBreadcrumbs' : ''].join(' ')
            }
        >
            Створення
        </NavLink>,
        <Typography key={'2'} color="text.primary">
            Товару
        </Typography>,
    ];

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs}
            </Breadcrumbs>
            <CreateProductForm />
        </>
    );
};

export default Product;
