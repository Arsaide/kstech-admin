import { Skeleton } from '@mui/material';
import { Key } from 'react';

const ProductsListSkeleton = () => {
    return (
        <div className={'cardsList'}>
            {Array.from({ length: 6 }).map((_, index: Key) => (
                <Skeleton
                    key={index}
                    animation="wave"
                    sx={{ height: 300, border: 'none' }}
                    className={'card'}
                />
            ))}
        </div>
    );
};

export default ProductsListSkeleton;
