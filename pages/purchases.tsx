import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { AvailableRoles } from '../store/auth/authReducer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useGetCartsForSellerQuery } from '../store/cart/cartApi';
import { CartDTO } from '../types/types';
import { PurchaseModal } from '../components/PurchaseModal';

export default function Purchases() {
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

    const { data } = useGetCartsForSellerQuery(
        { seller: seller ?? '', accessToken: accessToken ?? '' },
        { skip: !seller },
    );

    const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState<CartDTO | null>(null);

    return (
        <div className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Header />
                <Box sx={{ marginTop: '24px', width: '100%' }}>
                    <Typography>Заказы</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell align="left">Телефон</TableCell>
                                    <TableCell align="center">Сумма</TableCell>
                                    <TableCell align="center">Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((cart) => {
                                    return (
                                        <TableRow
                                            key={cart.contactInfo.name}
                                            sx={{
                                                cursor: 'pointer',
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                            onClick={() => {
                                                setModalData(cart);
                                                setCartModalIsOpen(true);
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {cart.contactInfo.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {cart.contactInfo.phone}
                                            </TableCell>
                                            <TableCell align="center">
                                                {cart.products.reduce(
                                                    (acc, item) => {
                                                        return (
                                                            acc +
                                                            item.price *
                                                                item.quantity
                                                        );
                                                    },
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {cart.status}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <PurchaseModal
                    modalIsOpen={cartModalIsOpen}
                    setModalIsOpen={setCartModalIsOpen}
                    modalData={modalData}
                />
            </main>
        </div>
    );
}
