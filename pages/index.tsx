import Head from 'next/head';

import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <Header />
                <Banner />
                <ProductCard />
            </main>
        </div>
    )
        ;
}


