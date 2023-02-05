import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const CartSummary = () => {
    const { products } = useSelector((state: RootState) => state.cart);

    const total = products.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <Typography
            fontSize={'24px'}
            fontWeight={400}
            sx={{ paddingY: '40px' }}
        >
            {`Итого: ${total} руб`}
        </Typography>
    );
};
