import React, { useState } from 'react';
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
    X,
} from 'lucide-react';
import Typography from '@mui/material/Typography';
import './CategoriesList.scss';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';

const CategoriesList = () => {
    const [isOpenCategories, setIsOpenCategories] = useState<
        Record<string, boolean>
    >({});

    const handleClickOpen = (id: string, isSubcategories: boolean) => {
        if (isSubcategories) {
            setIsOpenCategories(prevState => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        } else {
            return;
        }
    };

    const {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    } = useGetAllCategories();

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
                        <>
                            <ListItemButton
                                key={category.id}
                                onClick={() =>
                                    handleClickOpen(
                                        category.id,
                                        !!category.subcategory.length,
                                    )
                                }
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
                                    {category.subcategory.length > 0 ? (
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
                                    ) : null}
                                    {category.subcategory.length > 0 ? (
                                        isOpenCategories[category.id] ? (
                                            <ChevronUp />
                                        ) : (
                                            <ChevronDown />
                                        )
                                    ) : (
                                        <X />
                                    )}
                                </Box>
                            </ListItemButton>
                            {category.subcategory.map(
                                (subcategory, subcategoryIndex) => (
                                    <Collapse
                                        in={isOpenCategories[category.id]}
                                        timeout={'auto'}
                                        unmountOnExit
                                        key={subcategoryIndex + category.id}
                                    >
                                        <List component={'div'} disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <FileBox width={20} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${categoryIndex + 1}.${subcategoryIndex + 1}. ${subcategory}`}
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
                                                        >
                                                            <Pencil />
                                                        </div>
                                                    </>
                                                )}
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                ),
                            )}
                        </>
                    ))}
            </List>
        </>
    );
};

export default CategoriesList;
