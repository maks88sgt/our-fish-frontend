import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

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
                Cart page {products.length}
            </main>
        </div>
    );
}
