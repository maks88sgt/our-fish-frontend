import Head from 'next/head';

import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { Box } from '@mui/system';

import { ProductDTO } from '../types/types';

type IndexPageProps = {
    productsList: ProductDTO[];
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

export async function getServerSideProps() {
    const products = await fetch(
        'http://localhost:8080/api/products/published',
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    });
    return {
        props: { productsList: products },
    };
}
