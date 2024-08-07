import React from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button } from '@mui/material';

const Category = () => {
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
        <Typography key={'2'} color="text.primary">
            Категорії та підкатегорії
        </Typography>,
    ];

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs}
            </Breadcrumbs>
            <Box>
                <Typography variant={'h5'}>
                    Створення категорій та підкатегорій
                </Typography>
                <p className={'hint'} style={{ margin: '5px 0 20px' }}>
                    *На цій сторінці ви зможете створити нові категорії та
                    підкатегорії
                </p>
                <NavLink to={'/create/category-menu/create-categories'}>
                    <Button variant={'contained'}>Перейти</Button>
                </NavLink>
            </Box>

            <Box mt={5}>
                <Typography variant={'h5'}>
                    Редагування та видалення категорій та підкатегорій
                </Typography>
                <p className={'hint'} style={{ margin: '5px 0 20px' }}>
                    *На цій сторінці ви зможете відредагувати або видалити
                    категорії та підкатегорії
                </p>
                <NavLink to={'/create/category-menu/edit-categories'}>
                    <Button variant={'contained'}>Перейти</Button>
                </NavLink>
            </Box>
        </>
    );
};

export default Category;
