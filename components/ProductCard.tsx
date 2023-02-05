import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ProductDTO } from '../types/types';
import { getUnits } from '../utils/getUnits';
import { getCategory } from '../utils/getCategory';

export const ProductCard = ({
    name,
    description,
    price,
    category,
    image,
    units,
    published,
    isModeratorView,
    onAddToCartClick,
    onEditCardClick,
    onDeleteCardClick,
}: ProductDTO & {
    isModeratorView?: boolean;
    onAddToCartClick?: (ev: any) => void;
    onEditCardClick?: () => void;
    onDeleteCardClick?: () => void;
}) => {
    const theme = useTheme();
    return (
        <Card sx={{ width: 300, height: 400 }}>
            <Box sx={{ padding: '21px' }}>
                <CardMedia
                    component="img"
                    height="198"
                    image={image ? image : '/assets/default_image.png'}
                />
            </Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ fontSize: '24px' }}>{name}</Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ fontSize: '18px', color: '#B5B5B5' }}>
                        {getCategory(category)}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {price} руб/{getUnits(units)}
                    </Box>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: isModeratorView ? 'space-around' : 'center',
                }}
            >
                {isModeratorView ? (
                    <>
                        {published ? 'Опубликован' : 'Черновик'}
                        <IconButton
                            onClick={() => onEditCardClick && onEditCardClick()}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                onDeleteCardClick && onDeleteCardClick()
                            }
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </>
                ) : (
                    <Button variant={'contained'} onClick={onAddToCartClick}>
                        В корзину
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};
