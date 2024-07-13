import React, { FC, useEffect, useState } from 'react';
import './ProductCard.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { Settings } from 'lucide-react';
import { OneProductTypes } from '../../../../../api/models/ProductResponseModel';
import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import Tooltip from '@mui/material/Tooltip';

type ProductCardProps = Pick<
    OneProductTypes,
    'id' | 'name' | 'description' | 'price' | 'imgArr' | 'article' | 'discount'
>;

const ProductCard: FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    imgArr,
    article,
    discount,
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

    const discountCalc = (
        parseFloat(price as string) -
        (parseFloat(price as string) * parseFloat(discount as string)) / 100
    ).toFixed(2);

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
                        <div className={'cardArticle'}>
                            Артікл: #
                            <Tooltip title={'Скопіювати артікл'}>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(article)
                                    }
                                >
                                    {article}
                                </button>
                            </Tooltip>
                        </div>
                        <div className={'cardDesc'}>
                            {parse(descriptionWithoutStyles)}
                        </div>
                        <div className={'cardPriceCnt'}>
                            <div className={'cardPrice'}>
                                Ціна:{' '}
                                <span
                                    className={
                                        discount == '0' ? '' : 'isCardDiscount'
                                    }
                                >
                                    {discount == '0' ? (
                                        <>
                                            {parseFloat(price as string)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ' ',
                                                )}{' '}
                                            ₴
                                        </>
                                    ) : (
                                        <>
                                            {discountCalc
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ' ',
                                                )}{' '}
                                            ₴{' '}
                                            <span className={'oldCardPrice'}>
                                                {parseFloat(price as string)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ' ',
                                                    )}{' '}
                                                ₴
                                            </span>
                                            <span className={'priceCardDiff'}>
                                                -
                                                {(
                                                    parseFloat(
                                                        price as string,
                                                    ) - parseFloat(discountCalc)
                                                )
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ' ',
                                                    )}{' '}
                                                ₴
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className={'cardDiscount'}>
                                Знижка: {discount}%
                            </div>
                        </div>
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
