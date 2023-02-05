import Head from 'next/head';

import { Box } from '@mui/system';
import { ProductDTO } from '../../types/types';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button, CardMedia, Paper, Typography } from '@mui/material';
import { getCategory } from '../../utils/getCategory';
import { getUnits } from '../../utils/getUnits';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AvailableRoles } from '../../store/auth/authReducer';

export default function Product({ product }: { product: ProductDTO }) {
    const router = useRouter();

    const { roles } = useSelector((state: RootState) => state.auth);

    const isModerator = roles?.some((it) => it === AvailableRoles.moderator);

    return (
        <Box>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <>
                    <Header />
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: '24px',
                            backgroundColor: 'white',
                            position: 'relative',
                        }}
                    >
                        <Typography variant="h1">{product.name}</Typography>
                        <Box
                            sx={{
                                padding: '32px',
                                display: 'grid',
                                gridTemplateColumns: '1fr 3fr',
                                gap: '16px',
                            }}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    width={'250'}
                                    image={product.image ?? ''}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'grid',
                                        gridTemplateColumns: '20% 80%',
                                        gap: '24px',
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        Категория товара:{' '}
                                    </Typography>
                                    {getCategory(product.category)}
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'grid',
                                        gridTemplateColumns: '20% 80%',
                                        gap: '24px',
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        Описание:{' '}
                                    </Typography>
                                    {product.description}
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'grid',
                                        gridTemplateColumns: '20% 80%',
                                        gap: '24px',
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        Цена:{' '}
                                    </Typography>
                                    {product.price} руб/
                                    {getUnits(product.units)}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                            }}
                        >
                            <Button
                                variant={'outlined'}
                                onClick={() => {
                                    router.push('/');
                                }}
                            >
                                Вернуться к списку товаров
                            </Button>
                            {isModerator ? null : (
                                <Button
                                    variant={'contained'}
                                    onClick={() => {
                                        console.log('click');
                                    }}
                                >
                                    Добавить в корзину
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </>
            </main>
            <Footer />
        </Box>
    );
}

export async function getStaticPaths() {
    const products = await fetch(
        'http://localhost:8080/api/products/published',
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    });

    const paths = products.map((product: ProductDTO) => ({
        params: { product: product._id },
    }));

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context: { params: { product: string } }) {
    const { params } = context;
    const fetchedProduct = await fetch(
        `http://localhost:8080/api/products/${params.product}`,
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    });

    return {
        props: { product: fetchedProduct },
    };
}
