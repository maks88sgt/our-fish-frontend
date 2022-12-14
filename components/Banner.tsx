import { ImageList, ImageListItem, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/system';

export const Banner = () => {
    const [itemIndex, setItemIndex] = useState(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        const galleryTimerId = setTimeout(() => {
            if (itemIndex === itemData.length - 1) {
                setItemIndex(0);
                return;
            }
            setItemIndex(itemIndex + 1);
        }, 3000);
        return () => {
            clearTimeout(galleryTimerId);
        };
    }, [itemIndex]);

    return matches ? <ImageList sx={{
        width: '100%',
        height: 450,
        margin: 0,
        objectFit: 'none',
        objectPosition: 'center',
        overflow: 'hidden',
        position: 'relative',
    }} cols={1} rowHeight={200}>
        <ImageListItem key={itemData[itemIndex].img} sx={{ maxWidth: '100%' }}>
            <img
                src={`${itemData[itemIndex].img}`}
                srcSet={`${itemData[itemIndex].img}`}
                alt={itemData[itemIndex].title}
                loading='lazy'
            />
        </ImageListItem>
        <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            backgroundColor: 'rgba(0,0,0, 0.5)',
        }}><h1>Наша Рыба</h1>
            <Typography sx={{ fontSize: '32px', textAlign: 'center', width: '100%' }}>Качественная мурманская рыба по
                ценам на 25-30% ниже рыночных</Typography></Box>
    </ImageList> : null;
};

const itemData = [
    {
        img: 'https://thumb.tildacdn.com/tild3565-3235-4036-b766-343238353938/-/format/webp/DBV_4905.jpg',
        title: 'banner',
    },
    {
        img: 'https://thumb.tildacdn.com/tild3831-3365-4762-b632-383561383464/-/format/webp/DBV_5427.jpg',
        title: 'banner',
    },
    { img: 'https://thumb.tildacdn.com/tild3662-3836-4933-b766-303339356564/-/format/webp/1.png', title: 'banner' },
];
