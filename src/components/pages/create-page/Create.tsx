import React from 'react';
import { Box, Breadcrumbs, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Create = () => {
    const breadcrumbs = [
        <Typography key={'1'} color="text.primary">
            Перегляд меню
        </Typography>,
        <Typography key={'2'} color="text.primary">
            ...
        </Typography>,
    ];

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs}
            </Breadcrumbs>
            <Box sx={{ maxWidth: '500px' }}>
                <Typography variant={'h5'}>Створення товару</Typography>
                <p className={'hint'} style={{ margin: '5px 0 20px' }}>
                    *Натиснувши на кнопку, ви перейдете на сторінку, де зможете
                    створити новий товар
                </p>
                <NavLink to={'/create/product'}>
                    <Button variant={'contained'}>Перейти</Button>
                </NavLink>

                <Typography variant={'h5'} mt={5}>
                    Меню категорій та підкатегорій
                </Typography>
                <p className={'hint'} style={{ margin: '5px 0 20px' }}>
                    *Натиснувши на кнопку, ви перейдете на сторінку, де зможете
                    створити нові категорії або підкатегорії, відредагувати
                    категорії або видалити їх
                </p>
                <NavLink to={'/create/category-menu'}>
                    <Button variant={'contained'}>Перейти</Button>
                </NavLink>
            </Box>
        </>
    );
};

export default Create;
