import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <Header />
                <Banner/>

            </main>
        </div>
    )
        ;
}


