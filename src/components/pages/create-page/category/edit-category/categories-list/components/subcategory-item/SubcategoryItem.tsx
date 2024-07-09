import React, { FC } from 'react';
import { SubcategoryResponseModel } from '../../../../../../../../api/models/CategoriesResponseModel';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, ListItemIcon } from '@mui/material';
import { FileBox, Pencil, Trash2 } from 'lucide-react';
import ListItemText from '@mui/material/ListItemText';
import { MainColorsEnum } from '../../../../../../../../utils/enums/colors-enum';

interface SubcategoryItemProps {
    subcategory: SubcategoryResponseModel;
    categoryIndex: number;
    subcategoryIndex: number;
}

const SubcategoryItem: FC<SubcategoryItemProps> = ({
    subcategory,
    categoryIndex,
    subcategoryIndex,
}) => {
    return (
        <ListItemButton sx={{ pl: 4 }} key={subcategoryIndex}>
            <ListItemIcon>
                <FileBox width={20} />
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
                        src={subcategory.iconimg}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px / 6.7px',
                        }}
                    />
                    {categoryIndex + 1}.{subcategoryIndex + 1}.{' '}
                    {subcategory.subcategory}
                </Box>
            </ListItemText>
            {subcategory && (
                <>
                    <div className={'toolIcon'}>
                        <Trash2 color={MainColorsEnum.RED} />
                    </div>
                    <div className={'toolIcon'}>
                        <Pencil />
                    </div>
                </>
            )}
        </ListItemButton>
    );
};

export default SubcategoryItem;
