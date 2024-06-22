import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../api/context';
import { Alert, Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../../../utils/enums/colors-enum';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './ProductId.css';
import ProductIdEdit from './components/product-id-edit/ProductIdEdit';

const ProductId = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [images, setImages] = useState<
        { original: string; thumbnail: string }[]
    >([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['product-id', id],
        queryFn: async () => await store.getOneProduct(id),
        select: data => data.data.product,
    });

    useEffect(() => {
        if (data && data.imgArr) {
            const imagesData = data.imgArr.map((url: string) => ({
                original: url,
                thumbnail: url,
            }));
            setImages(imagesData);
        }
    }, [data]);

    console.log(data);

    return (
        <div>
            {isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CircularProgress
                        size={300}
                        thickness={2}
                        color={'success'}
                    />
                    <Typography
                        sx={{
                            color: MainColorsEnum.BLACK,
                            textAlign: 'center',
                        }}
                    >
                        Зачекайте відповіді від серверу...
                    </Typography>
                </Box>
            ) : isError ? (
                <Alert variant="filled" severity="error">
                    Error: {error.message}
                </Alert>
            ) : (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className={'cntImg'}>
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {data &&
                                data.imgArr.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={'Свайпер тумблер'}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {data &&
                                data.imgArr.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={'Свайпер тумблер'}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>

                    <div className={'cntText'}>
                        <div>
                            Назва товару: {data?.name}. Артікул товару:{' '}
                            {data?.article}
                        </div>
                        <div>
                            Ціна: {data?.price}. Знижка: {data?.discount}
                        </div>
                        <div>Кольори: {data?.colors}</div>
                        <div>Опис товару: {data?.description}</div>
                        <div>
                            Категорія товару - {data?.category}. Підкатегорія
                            товару - {data?.subcategory}
                        </div>
                        <div>Послуги:</div>
                        <div>Наяність: {data?.inAvailability}</div>
                        <div>Методи оплати: {data?.paymentMethod}</div>
                        <div>Методи доставки: {data?.deliveryMethod}</div>
                        <div>
                            Сервісне обслуговування: {data?.turningMethod}
                        </div>
                        <div>Характеристики товару</div>
                        <div>Вага: {data?.weight}</div>
                        <div>Довжина: {data?.long}</div>
                        <div>Висота: {data?.height}</div>
                        <div>Ширина: {data?.width}</div>
                    </div>
                </div>
            )}
            {data && <ProductIdEdit data={data} />}
        </div>
    );
};

export default ProductId;
