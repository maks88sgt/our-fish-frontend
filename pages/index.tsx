import Head from 'next/head';

import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { Box } from '@mui/system';
import { ProductDTO } from '../components/ProductEditor';

type IndexPageProps = {
    productsList: any[];
};

export default function Index({ productsList }: IndexPageProps) {
    return (
        <Box className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Banner />
                <ProductGrid productsList={productsList} />
            </main>
            <Footer />
        </Box>
    );
}

export async function getStaticProps() {
    return {
        props: { productsList: [] },
    };
}

export type IndexPageDataType = GeneralPaginatedResponseType<ProductDTO[]>;

export type GeneralResponseType<T, S = void> = {
    message: string | null;
    data: T;
    extraData: S;
};

export type GeneralPaginatedResponseType<T, S = void> = GeneralResponseType<
    T,
    S
> & {
    pagination: PaginationResponse;
};

export type PaginationResponse = {
    page: number;
    hasMore: boolean;
    totalItems: number;
    totalPages: number;
};
