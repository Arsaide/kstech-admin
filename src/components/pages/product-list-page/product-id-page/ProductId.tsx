import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../api/context';
import { Alert, Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../../../utils/enums/colors-enum';
import ImageGallery from 'react-image-gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './ProductId.css';

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
        select: data => data.data,
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
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/*<div style={{ maxWidth: '450px'}}>*/}
                    {/*    <ImageGallery items={images} lazyLoad={true} showNav={false} showPlayButton={false} />*/}
                    {/*</div>*/}

                    <div className={'cnt'}>
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
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                            </SwiperSlide>
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

                    <div style={{ flex: '1 1 auto' }}>
                        <div>Name: {data?.name}</div>
                        <div>In availability: {data?.inAvailability}</div>
                        <div>Price: {data?.price}</div>
                        <div>Color: {data?.colors}</div>
                        <div>Description: {data?.description}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductId;
