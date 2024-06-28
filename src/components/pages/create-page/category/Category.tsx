import React, { useContext, useState } from 'react';
import CreateSubcategoryForm from './categories-form/CreateSubcategoryForm';
import CreateCategoryForm from './categories-form/CreateCategoryForm';
import { CategoriesContext } from '../../../../providers/CategoriesProvider';
import { NavLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import '../Create.scss';

const Category = () => {
    const { isVisibleSubcategories, setIsVisibleSubcategories } =
        useContext(CategoriesContext);
    const [currentForm, setCurrentForm] = useState('category');

    const handleCategoryChange = (formName: React.SetStateAction<string>) => {
        setCurrentForm(formName);
        setIsVisibleSubcategories(true);
    };

    const handleSubcategoryChange = (
        formName: React.SetStateAction<string>,
    ) => {
        setCurrentForm(formName);
        setIsVisibleSubcategories(false);
    };

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
            {isVisibleSubcategories ? 'Підкатегорія' : 'Категорія'}
        </Typography>,
    ];

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs}
            </Breadcrumbs>
            <Box sx={{ maxWidth: '500px', mb: 2 }}>
                {!isVisibleSubcategories ? (
                    <>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleCategoryChange('subcategory')}
                            className={
                                currentForm === 'subcategory'
                                    ? 'active-button'
                                    : ''
                            }
                        >
                            Створити підкатерії
                        </Button>
                        <p className={'hint'}>
                            *Підказка: натиснувши на кнопку ви перейдете на
                            сторінку створення підкатегорій
                        </p>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleSubcategoryChange('category')}
                            className={
                                currentForm === 'category'
                                    ? 'active-button'
                                    : ''
                            }
                        >
                            Категорії
                        </Button>
                        <p className={'hint'}>
                            *Підказка: натиснувши на кнопку ви перейдете на
                            сторінку категорій, де можно створити нові або
                            переглянути існуючі категорії та їх підкатегорії
                        </p>
                    </>
                )}
                {currentForm === 'subcategory' ? (
                    <CreateSubcategoryForm />
                ) : isVisibleSubcategories ? (
                    <CreateSubcategoryForm />
                ) : (
                    <CreateCategoryForm />
                )}
            </Box>
        </>
    );
};

export default Category;
