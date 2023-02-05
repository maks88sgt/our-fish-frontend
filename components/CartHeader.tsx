import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export const CartHeader = ({ productsCount }: { productsCount: number }) => {
    return (
        <Box
            sx={{
                paddingY: '40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '24px',
            }}
        >
            <Typography
                fontSize={'24px'}
                fontWeight={400}
                sx={{ color: '#1E8FFF' }}
            >
                Ваша корзина
            </Typography>
            <Typography
                fontSize={'18px'}
                fontWeight={400}
                sx={{ color: '#C7C7C7' }}
            >
                &nbsp;
                {`${productsCount} товар${
                    productsCount === 1
                        ? ''
                        : productsCount > 1 && productsCount < 5
                        ? 'а'
                        : 'ов'
                }`}
            </Typography>
        </Box>
    );
};
