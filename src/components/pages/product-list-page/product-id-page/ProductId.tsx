import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { Context } from '../../../../api/context';
import { Alert, Box, Button, Chip, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../../../utils/enums/colors-enum';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './ProductId.scss';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import {
    Ban,
    Check,
    FileBox,
    FolderOpen,
    HandCoins,
    History,
    Package,
    Pencil,
    ReceiptText,
    Trash2,
} from 'lucide-react';
import classNames from 'classnames';
import ProductIdEdit from './components/product-id-edit/ProductIdEdit';
import ModalWindow from '../../../layout/common/ui/modal/ModalWindow';
import ProductDeleteModal from './components/product-delete-model/ProductDeleteModal';

const ProductId = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [images, setImages] = useState<
        { original: string; thumbnail: string }[]
    >([]);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty(),
    );
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] =
        useState<boolean>(false);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['get-one-product', id],
        queryFn: async () => await store.getOneProduct(id),
        select: data => data.data.product,
    });

    const price = data?.price;

    const discountCalc = (
        parseFloat(price as string) -
        (parseFloat(price as string) * parseFloat(data?.discount as string)) /
            100
    ).toFixed(2);

    useEffect(() => {
        if (data && data.imgArr) {
            const imagesData = data.imgArr.map((url: string) => ({
                original: url,
                thumbnail: url,
            }));
            setImages(imagesData);
        }
        if (data && data.description) {
            const contentState = convertFromRaw(JSON.parse(data.description));
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [data]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <CircularProgress size={300} thickness={2} color={'success'} />
                <Typography
                    sx={{
                        color: MainColorsEnum.BLACK,
                        textAlign: 'center',
                    }}
                >
                    Зачекайте відповіді від серверу...
                </Typography>
            </Box>
        );
    } else if (isError) {
        <Alert variant="filled" severity="error">
            Error: {error.message}
        </Alert>;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                }}
            >
                {data && data.imgArr && (
                    <div className={'cntImg'}>
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{
                                swiper: thumbsSwiper || undefined,
                            }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {data.imgArr.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} alt={'Свайпер тумблер'} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={(swiper: any) => {
                                setThumbsSwiper(swiper);
                            }}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {data.imgArr.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} alt={'Свайпер тумблер'} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Button
                            onClick={() => setIsVisibleDeleteModal(true)}
                            variant={'contained'}
                            color={'error'}
                        >
                            <Trash2 size={20} /> Видалити товар
                        </Button>
                        <ModalWindow
                            isOpen={isVisibleDeleteModal}
                            handleClose={() => setIsVisibleDeleteModal(false)}
                            title={'Видалення товару'}
                        >
                            <ProductDeleteModal
                                id={data?.id}
                                name={data?.name}
                            />
                        </ModalWindow>
                    </div>
                )}

                <div className={'cntText'}>
                    <Typography variant={'h4'} sx={{ mb: 1 }}>
                        {data?.name}
                    </Typography>
                    <p className={'productHint'}>
                        Артікул товару: {data?.article}
                    </p>
                    <div
                        className={classNames('availabilityCnt', {
                            isAvailability:
                                data?.inAvailability === 'В наявності',
                            isOrder: data?.inAvailability === 'Під замовлення',
                            isNotAvailability:
                                data?.inAvailability === 'Немає в наявності',
                            undefinedAvailability: ![
                                'В наявності',
                                'Під замовлення',
                                'Немає в наявності',
                            ].includes(data?.inAvailability as string),
                        })}
                    >
                        {data?.inAvailability === 'В наявності' ? (
                            <>
                                <Check size={25} />В наявності
                            </>
                        ) : data?.inAvailability === 'Під замовлення' ? (
                            <>
                                <History size={20} /> Під замовлення
                            </>
                        ) : data?.inAvailability === 'Немає в наявності' ? (
                            <>
                                <Ban size={20} /> Немає в наявності
                            </>
                        ) : (
                            <>
                                <Ban size={20} /> data?.inAvailability
                            </>
                        )}
                    </div>
                    <div className={'priceCnt'}>
                        <div className={'price'}>
                            Ціна:{' '}
                            <span
                                className={
                                    data?.discount == '0' ? '' : 'isDiscount'
                                }
                            >
                                {data?.discount == '0' ? (
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
                                        <span className={'oldPrice'}>
                                            {parseFloat(price as string)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ' ',
                                                )}{' '}
                                            ₴
                                        </span>
                                        <span className={'priceDiff'}>
                                            -
                                            {(
                                                parseFloat(
                                                    data?.price as string,
                                                ) - parseFloat(discountCalc)
                                            )
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
                        <div className={'discount'}>
                            Знижка: {data?.discount}%
                        </div>
                    </div>
                    <div className={'colors'}>
                        Кольори:
                        <div className={'colorsContainer'}>
                            {data?.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={'colorCircle'}
                                    style={{
                                        backgroundColor: `${color}`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={'desc'}>
                        <div className={'descTitle'}>Опис товару</div>
                        <div className={'descText'}>
                            {parse(
                                draftToHtml(
                                    convertToRaw(
                                        editorState.getCurrentContent(),
                                    ),
                                ),
                            )}
                        </div>
                    </div>
                    <div className={'info'}>
                        <div className="infoTitle">Характеристики товару</div>
                        <div className={'infoCnt'}>
                            <div>Вага: {data?.weight} кг.</div>
                            <div>Довжина: {data?.long} м.</div>
                            <div>Висота: {data?.height} м.</div>
                            <div>Ширина: {data?.width} м.</div>
                        </div>
                    </div>
                    <div className={'categories'}>
                        <div className={'category'}>
                            <FolderOpen size={20} /> Категорія -{' '}
                            <span>{data?.categoryName}</span>
                        </div>
                        <div className={'subcategory'}>
                            <FileBox size={20} /> Підкатегорія -{' '}
                            <span>{data?.subcategoryName}</span>
                        </div>
                        <NavLink
                            className={'categoryLink'}
                            to={'/create/category-menu'}
                        >
                            <Pencil size={20} />
                            Редагувати категорії
                        </NavLink>
                    </div>
                    <div className={'services'}>
                        <div className={'servicesTitle'}>Послуги</div>
                        <div className={'servicesContent'}>
                            <div className={'paymentMethod'}>
                                <div className={'paymentMethodTitle'}>
                                    <HandCoins size={20} /> Методи оплати:
                                </div>
                                <div className={'paymentMethodCnt'}>
                                    {data?.paymentMethod.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            sx={{
                                                maxWidth: 'max-content',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={'deliveryMethod'}>
                                <div className="deliveryMethodTitle">
                                    <Package size={20} /> Методи доставки:
                                </div>
                                <div className={'deliveryMethodCnt'}>
                                    {data?.deliveryMethod.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            sx={{
                                                maxWidth: 'max-content',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={'turningMethod'}>
                                <div className="turningMethodTitle">
                                    <ReceiptText size={20} /> Сервісне
                                    обслуговування:
                                </div>
                                <div className={'turningMethodCnt'}>
                                    {data?.turningMethod.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            sx={{
                                                maxWidth: 'max-content',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {data && <ProductIdEdit data={data} />}
        </div>
    );
};

export default ProductId;
