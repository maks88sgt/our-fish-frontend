import { Box } from '@mui/system';
import { ProductCard } from './ProductCard';
import { Product } from '../pages';

type ProductGridProps = {
    productsList: Product[]
}

export const ProductGrid = ({ productsList }: ProductGridProps) => {
    return <Box sx={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px',
    }}>{productsList.map((item) => {
        return <ProductCard {...item} />;
    })}</Box>;
};
