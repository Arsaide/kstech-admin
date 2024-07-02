import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

const EditCategory = () => {
    const breadcrumbs = [
        <NavLink
            key={'1'}
            to="/create"
            className={({ isActive }) =>
                [isActive ? 'activeBreadcrumbs' : ''].join(' ')
            }
        >
            Перегляд меню
        </NavLink>,
        <NavLink
            key={'2'}
            to="/create/category-menu"
            className={({ isActive }) =>
                [isActive ? 'activeBreadcrumbs' : ''].join(' ')
            }
        >
            Категорії та підкатегорії
        </NavLink>,
        <Typography key={'3'} color="text.primary">
            Перегляд
        </Typography>,
    ];

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs}
            </Breadcrumbs>
        </>
    );
};

export default EditCategory;
