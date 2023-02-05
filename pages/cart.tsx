import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { CartHeader } from '../components/CartHeader';
import { CartProductsTable } from '../components/CartProductsTable';
import { CartSummary } from '../components/CartSummary';
import { PurchaseForm } from '../components/PurchaseForm';
import { useCreateCartMutation } from '../store/cart/cartApi';
import { useEffect } from 'react';
import { setSavedCart } from '../store/cart/cartActions';

export default function Cart() {
    const { products, savedCart } = useSelector(
        (state: RootState) => state.cart,
    );
    const [createCart, createCartResponse] = useCreateCartMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (products.length && !savedCart.cartId) {
            createCart({
                products: products.map((product) => ({
                    ...product,
                    quantity: 1,
                })),
            });
        }
    }, [products]);

    useEffect(() => {
        if (createCartResponse.isSuccess) {
            dispatch(
                setSavedCart(
                    createCartResponse.data.products,
                    createCartResponse.data._id,
                ),
            );
        }
    }, [createCartResponse]);

    console.log(savedCart);

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
                    <PurchaseForm />
                </Box>
            </main>
        </div>
    );
}
