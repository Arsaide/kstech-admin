import { FC, useEffect, useState } from 'react';
import './ProductCard.css';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { Settings } from 'lucide-react';
import { OneProductTypes } from '../../../../../api/models/ProductResponseModel';
import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';

type ProductCardProps = Pick<
    OneProductTypes,
    'id' | 'name' | 'description' | 'price' | 'imgArr'
>;

const ProductCard: FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    imgArr,
}) => {
    const [htmlDescription, setHtmlDescription] = useState<string>('');

    useEffect(() => {
        if (description) {
            try {
                const contentState = convertFromRaw(JSON.parse(description));
                const html = draftToHtml(convertToRaw(contentState));
                setHtmlDescription(html);
            } catch (e) {
                console.error('Failed to parse description:', e);
            }
        }
    }, [description]);

    const trimHtmlDescription = (html: string, maxLength: number) => {
        const textOnly = html.replace(/<[^>]+>/g, '');
        if (textOnly.length <= maxLength) {
            return html;
        }
        return textOnly.substring(0, maxLength) + '...';
    };

    const removeStylesFromHtmlString = (htmlString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        doc.querySelectorAll('*').forEach(node => {
            node.removeAttribute('style');
        });
        return doc.body.innerHTML;
    };

    const sanitizedHtmlDescription = trimHtmlDescription(htmlDescription, 300);
    const descriptionWithoutStyles = removeStylesFromHtmlString(
        sanitizedHtmlDescription,
    );

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
                        <div className={'cardDesc'}>
                            {parse(descriptionWithoutStyles)}
                        </div>
                        <div className={'cardPrice'}>{price} грн</div>
                    </div>
                    <Button variant="contained" sx={{ width: 'max-content' }}>
                        <NavLink
                            to={`/products-list/${id}`}
                            className={'cardBtn'}
                        >
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
