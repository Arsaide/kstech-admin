import React, { useContext, useState } from 'react';
import useGetAllCategories from '../../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import List from '@mui/material/List';
import { Box, Collapse, ListItemIcon, ListSubheader } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
    ChevronDown,
    ChevronUp,
    FileBox,
    FileStack,
    Folder,
    FolderOpen,
    Pencil,
    Trash2,
} from 'lucide-react';
import Typography from '@mui/material/Typography';
import './CategoriesList.scss';
import { useGetOneCategory } from '../../../../../../hooks/queries/categories/use-get-one-category/useGetOneCategory';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { CategoriesContext } from '../../../../../../providers/CategoriesProvider';
import { GetOneCategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import { GetOneCategory } from '../../../../../../types/categories/GetOneCategory.types';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';

const CategoriesList = () => {
    const queryClient: QueryClient = useQueryClient();
    const { isOpenCategories, setIsOpenCategories } =
        useContext(CategoriesContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );

    const {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    } = useGetAllCategories();

    const {
        categoryData,
        isLoadingGetCategory,
        isGetCategoryError,
        getCategoryError,
    } = useGetOneCategory(selectedCategoryId);

    const handleClickOpen = (id: string) => {
        setIsOpenCategories(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));

        const cachedCategoryData =
            queryClient.getQueryData<GetOneCategoryResponseModel>([
                'get-one-category',
                id,
            ]);

        if (!cachedCategoryData) {
            setSelectedCategoryId(id);
        }
    };

    return (
        <>
            <Box mt={5}>
                <Typography variant={'h5'}>Перегляд категорій</Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <FileStack width={20} /> Кількість категорій -{' '}
                    <strong>
                        {categoriesData?.length ? categoriesData.length : '0'}
                    </strong>
                </Typography>
            </Box>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                }}
                component={'nav'}
                aria-labelledby={'list-of-categories'}
                subheader={
                    <ListSubheader component={'div'} id={'list-of-categories'}>
                        Список категорій
                    </ListSubheader>
                }
            >
                {categoriesData?.length &&
                    categoriesData.map((category, categoryIndex) => (
                        <React.Fragment key={category.id}>
                            <ListItemButton
                                onClick={() => handleClickOpen(category.id)}
                            >
                                <ListItemIcon>
                                    {isOpenCategories[category.id] ? (
                                        <FolderOpen />
                                    ) : (
                                        <Folder />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${categoryIndex + 1}. ${category.category}`}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <>
                                        <div className={'toolIcon'}>
                                            <Trash2
                                                color={MainColorsEnum.RED}
                                            />
                                        </div>
                                        <div className={'toolIcon'}>
                                            <Pencil />
                                        </div>
                                    </>
                                    {isOpenCategories[category.id] ? (
                                        <ChevronUp />
                                    ) : (
                                        <ChevronDown />
                                    )}
                                </Box>
                            </ListItemButton>
                            <Collapse
                                in={isOpenCategories[category.id]}
                                timeout={'auto'}
                                unmountOnExit
                            >
                                <List component={'div'} disablePadding>
                                    {isOpenCategories[category.id] &&
                                        queryClient
                                            .getQueryData<GetOneCategory>([
                                                'get-one-category',
                                                category.id,
                                            ])
                                            ?.data.subcategory?.map(
                                                (
                                                    subcategory,
                                                    subcategoryIndex,
                                                ) => (
                                                    <ListItemButton
                                                        sx={{ pl: 4 }}
                                                        key={subcategoryIndex}
                                                    >
                                                        <ListItemIcon>
                                                            <FileBox
                                                                width={20}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={`${categoryIndex + 1}.${subcategoryIndex + 1}. ${subcategory.subcategory}`}
                                                        />
                                                        {subcategory && (
                                                            <>
                                                                <div
                                                                    className={
                                                                        'toolIcon'
                                                                    }
                                                                >
                                                                    <Trash2
                                                                        color={
                                                                            MainColorsEnum.RED
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    className={
                                                                        'toolIcon'
                                                                    }
                                                                    onClick={() =>
                                                                        handleClickOpen
                                                                    }
                                                                >
                                                                    <Pencil />
                                                                </div>
                                                            </>
                                                        )}
                                                    </ListItemButton>
                                                ),
                                            )}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
            </List>
        </>
    );
};

export default CategoriesList;
