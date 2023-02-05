import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { CartHeader } from '../components/CartHeader';
import { CartProductsTable } from '../components/CartProductsTable';
import { CartSummary } from '../components/CartSummary';

export default function Cart() {
    const { products } = useSelector((state: RootState) => state.cart);

    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Box width={'100%'}>
                    <CartHeader productsCount={products.length} />
                    <CartProductsTable />
                    <CartSummary />
                </Box>
            </main>
        </div>
    );
}
