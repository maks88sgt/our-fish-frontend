import { Box } from '@mui/system';
import { ProductCard } from './ProductCard';
import Link from 'next/link';
import { ProductDTO } from '../types/types';

type ProductGridProps = {
    productsList: ProductDTO[];
};

export const ProductGrid = ({ productsList }: ProductGridProps) => {
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
                return (
                    <Link key={item._id} href={`/product/${item._id}`}>
                        <ProductCard
                            {...item}
                            onAddToCartClick={(ev) => {
                                ev.stopPropagation();
                                ev.preventDefault();
                                console.log('clicked');
                            }}
                        />
                    </Link>
                );
            })}
        </Box>
    );
};
