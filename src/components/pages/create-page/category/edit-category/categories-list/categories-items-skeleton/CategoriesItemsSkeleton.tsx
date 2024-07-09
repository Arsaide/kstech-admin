import React from 'react';
import { Box, ListItemIcon, Skeleton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { ChevronDown, Folder } from 'lucide-react';
import ListItemText from '@mui/material/ListItemText';
import { MainColorsEnum } from '../../../../../../../utils/enums/colors-enum';

const CategoriesItemsSkeleton = () => {
    return (
        <ListItemButton sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
            <ListItemIcon>
                <Folder color={MainColorsEnum.BLACK05} />
            </ListItemIcon>
            <ListItemText>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Skeleton animation="wave" height={'40px'} width={'40px'} />
                    <Skeleton animation="wave" width={'250px'} />
                </Box>
            </ListItemText>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Skeleton animation="wave" height={'36px'} width={'36px'} />
                <Skeleton animation="wave" height={'36px'} width={'36px'} />
                <ChevronDown color={MainColorsEnum.BLACK05} />
            </Box>
        </ListItemButton>
    );
};

export default CategoriesItemsSkeleton;
