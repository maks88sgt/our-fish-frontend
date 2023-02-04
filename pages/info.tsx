import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { Banner } from '../components/Banner';
import { Footer } from '../components/Footer';
import { Box } from '@mui/system';

export default function Info() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <Header />
                <Banner/>
                <Box>
                    <Box></Box>
                    <Box></Box>
                </Box>
            </main>
            <Footer/>
        </div>
    );
}
