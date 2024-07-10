import React, { FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Collapse, List, ListItemIcon } from '@mui/material';
import {
    ChevronDown,
    ChevronUp,
    Folder,
    FolderOpen,
    Pencil,
    Trash2,
} from 'lucide-react';
import ListItemText from '@mui/material/ListItemText';
import { MainColorsEnum } from '../../../../../../../../utils/enums/colors-enum';
import { CategoryResponseModel } from '../../../../../../../../api/models/CategoriesResponseModel';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import SubcategoryItem from '../subcategory-item/SubcategoryItem';
import { GetOneCategory } from '../../../../../../../../types/categories/GetOneCategory.types';

interface CategoryItemProps {
    category: CategoryResponseModel;
    isOpen: boolean;
    onToggleOpen: (id: string) => void;
    onDeleteButtonClick: (event: React.MouseEvent) => void;
    onEditButtonClick: (event: React.MouseEvent) => void;
    categoryIndex: number;
}

const CategoryItem: FC<CategoryItemProps> = ({
    category,
    isOpen,
    onToggleOpen,
    onDeleteButtonClick,
    onEditButtonClick,
    categoryIndex,
}) => {
    const queryClient: QueryClient = useQueryClient();

    return (
        <>
            <ListItemButton onClick={() => onToggleOpen(category.id)}>
                <ListItemIcon>
                    {isOpen ? <FolderOpen /> : <Folder />}
                </ListItemIcon>
                <ListItemText>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <img
                            src={category.iconImg}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px / 6.7px',
                            }}
                            alt={category.category}
                        />
                        {categoryIndex + 1}. {category.category}
                    </Box>
                </ListItemText>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <>
                        <div
                            className={'toolIcon'}
                            onClick={onDeleteButtonClick}
                        >
                            <Trash2 color={MainColorsEnum.RED} />
                        </div>
                        <div className={'toolIcon'} onClick={onEditButtonClick}>
                            <Pencil />
                        </div>
                    </>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </Box>
            </ListItemButton>
            <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                <List component={'div'} disablePadding>
                    {queryClient
                        .getQueryData<GetOneCategory>([
                            'get-one-category',
                            category.id,
                        ])
                        ?.data.subcategory?.map(
                            (subcategory, subcategoryIndex) => (
                                <SubcategoryItem
                                    key={subcategoryIndex}
                                    subcategory={subcategory}
                                    categoryIndex={categoryIndex}
                                    subcategoryIndex={subcategoryIndex}
                                />
                            ),
                        )}
                </List>
            </Collapse>
        </>
    );
};

export default CategoryItem;
