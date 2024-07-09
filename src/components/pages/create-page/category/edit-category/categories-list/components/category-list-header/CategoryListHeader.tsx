import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { FileStack } from 'lucide-react';
import { Box } from '@mui/material';

interface CategoryListHeaderProps {
    categoryCount: string | number;
}

const CategoryListHeader: FC<CategoryListHeaderProps> = ({ categoryCount }) => {
    return (
        <Box mt={5}>
            <Typography variant={'h5'}>Перегляд категорій</Typography>
            <Typography
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
                <FileStack width={20} /> Кількість категорій -{' '}
                <strong>{categoryCount}</strong>
            </Typography>
        </Box>
    );
};

export default CategoryListHeader;
