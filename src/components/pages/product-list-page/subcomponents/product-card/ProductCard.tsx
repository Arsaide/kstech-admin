import { OneProductResponseModel } from '../../../../../api/models/ProductResponseModel.ts';
import { FC } from 'react';
import './ProductCard.css';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { Settings } from 'lucide-react';

type ProductCardProps = Pick<
    OneProductResponseModel,
    'id' | 'name' | 'description' | 'price' | 'imgArr'
>;

const ProductCard: FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    imgArr,
}) => {
    const trimmedString =
        description.length > 400
            ? description.substring(0, 400) + '...'
            : description;

    return (
        <div className={'card'}>
            <div className={'cardCnt'}>
                <div className={'cardImgCnt'}>
                    <img
                        src={imgArr[0]}
                        alt={`Картка товару ${name}`}
                        className={'cardImg'}
                    />
                </div>
                <div className={'cardContent'}>
                    <div className={'cardTypography'}>
                        <div className={'cardName'}>{name}</div>
                        <div className={'cardDesc'}>{trimmedString}</div>
                        <div className={'cardPrice'}>{price} грн</div>
                    </div>
                    <Button variant="contained" sx={{ width: 'max-content' }}>
                        <NavLink to={`/products/${id}`} className={'cardBtn'}>
                            <Settings size={20} />
                            Редагувати
                        </NavLink>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
