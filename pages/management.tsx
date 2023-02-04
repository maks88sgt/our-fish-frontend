import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { AvailableRoles } from '../store/auth/authReducer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    useDeleteProductMutation,
    useGetAllProductsBySellerQuery,
    useGetAllPublishedProductsQuery,
} from '../store/products/productsApi';
import { Box } from '@mui/system';
import { ProductDTO, ProductEditor } from '../components/ProductEditor';
import { Button } from '@mui/material';
import { ProductCard } from '../components/ProductCard';

export default function Management() {
    const [editorIsOpen, setEditorIsOpen] = useState(false);

    const { roles, seller, accessToken } = useSelector(
        (state: RootState) => state.auth,
    );

    const isModerator = roles?.some((it) => it === AvailableRoles.moderator);

    const router = useRouter();

    useEffect(() => {
        if (!isModerator || !seller || !accessToken) {
            router.push('/');
        }
    }, [router, isModerator, seller, accessToken]);

    const { data } = useGetAllProductsBySellerQuery(
        { seller, accessToken },
        { skip: !seller },
    );

    const [deleteProduct] = useDeleteProductMutation();

    console.log('>>>>>>>>>>>>>>>>>>', data);

    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Button
                    variant={'contained'}
                    onClick={() => setEditorIsOpen(true)}
                >
                    Добавить новый продукт
                </Button>
                <ProductEditor
                    editorIsOpen={editorIsOpen}
                    setEditorIsOpen={setEditorIsOpen}
                />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '24px',
                    }}
                >
                    {data &&
                        data.map((product: ProductDTO) => (
                            <ProductCard
                                key={product._id}
                                {...product}
                                isModeratorView={true}
                                onDeleteCardClick={() => {
                                    accessToken &&
                                        deleteProduct({
                                            id: product._id,
                                            accessToken,
                                        });
                                }}
                            />
                        ))}
                </Box>
            </main>
        </div>
    );
}
