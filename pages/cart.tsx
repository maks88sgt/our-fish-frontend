import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Cart() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <Header />
                Cart page
            </main>
        </div>
    );
}
