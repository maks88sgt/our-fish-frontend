import Head from 'next/head';

import { Box } from '@mui/system';
import { ProductDTO } from '../../types/types';
import { Banner } from '../../components/Banner';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function Product({ product }: { product: ProductDTO }) {
    return (
        <Box>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <>
                    <Header />
                    <Banner />
                    {JSON.stringify(product)}
                </>
            </main>
            <Footer />
        </Box>
    );
}

export async function getStaticPaths() {
    const products = await fetch(
        'http://localhost:8080/api/products/published',
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    });

    const paths = products.map((product: ProductDTO) => ({
        params: { product: product._id },
    }));

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context: { params: { product: string } }) {
    const { params } = context;
    const fetchedProduct = await fetch(
        `http://localhost:8080/api/products/${params.product}`,
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    });

    return {
        props: { product: fetchedProduct },
    };
}
