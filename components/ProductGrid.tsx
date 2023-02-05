import { Box } from '@mui/system';
import { ProductCard } from './ProductCard';
import Link from 'next/link';
import { ProductDTO } from '../types/types';
import { addProductToCart } from '../store/cart/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/router';

type ProductGridProps = {
    productsList: ProductDTO[];
};

export const ProductGrid = ({ productsList }: ProductGridProps) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const { products } = useSelector((state: RootState) => state.cart);
    return (
        <Box
            sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: '1fr 1fr 1fr',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '16px',
            }}
        >
            {productsList.map((item) => {
                const isProductInCart = products.some(
                    (it) => it._id === item._id,
                );
                return (
                    <Link key={item._id} href={`/product/${item._id}`}>
                        <ProductCard
                            {...item}
                            onAddToCartClick={(ev) => {
                                ev.stopPropagation();
                                ev.preventDefault();
                                isProductInCart
                                    ? router.push('/cart')
                                    : dispatch(addProductToCart(item));
                            }}
                            addToCartLabel={
                                isProductInCart ? 'Перейти к корзине' : ''
                            }
                        />
                    </Link>
                );
            })}
        </Box>
    );
};
