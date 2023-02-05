import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { Banner } from '../components/Banner';
import { Footer } from '../components/Footer';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Info() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                    }}
                >
                    <Typography variant={'h1'}>Ваш заказ принят</Typography>
                    <Typography variant={'h6'}>
                        Менеджер свяжется с Вами в ближайшее время для уточнения
                        деталей
                    </Typography>
                    <Typography variant={'h5'}>
                        А пока вы можете вернуться на главную страницу и выбрать
                        что-то еще
                    </Typography>
                    <Button
                        variant={'contained'}
                        onClick={() => router.push('/')}
                    >
                        На главную
                    </Button>
                </Box>
            </main>
            <Footer />
        </div>
    );
}
