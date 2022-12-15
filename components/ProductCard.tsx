import { Button, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import { Box, useTheme } from '@mui/system';

export const ProductCard = () => {
    const theme = useTheme();
    return <Card sx={{ width: 300, height: 400 }}>
        <Box sx={{ padding: '21px' }}>
            <CardMedia
                component='img'
                height='198'
                image='/assets/default_image.png'
            />
        </Box>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ fontSize: '24px' }}>Пикша
                охлажденная</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ fontSize: '18px', color: '#B5B5B5' }}>Охлажденная</Box>
                <Box sx={{ fontSize: '24px', fontWeight: 700, color: theme.palette.primary.main }}>149 руб/кг</Box>
            </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant={'contained'}>В корзину</Button>
        </CardActions>
    </Card>;
};


const card = {};
