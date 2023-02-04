import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useCreateProductMutation } from '../store/products/productsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ProductEditor = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [published, setPublished] = useState(false);

    const { accessToken, seller } = useSelector(
        (state: RootState) => state.auth,
    );

    const [createProduct] = useCreateProductMutation();

    return (
        <Box>
            <TextField
                label={'Название товара'}
                variant={'outlined'}
                helperText={'Введите название товара'}
                autoComplete={'off'}
                value={productName}
                onChange={(ev) => {
                    setProductName(ev.target.value);
                }}
                fullWidth={true}
            />
            <TextField
                label={'Описание'}
                variant={'outlined'}
                helperText={'Введите подробное описание товара'}
                autoComplete={'off'}
                value={productDescription}
                onChange={(ev) => {
                    setProductDescription(ev.target.value);
                }}
                fullWidth={true}
            />
            <TextField
                label={'Цена'}
                variant={'outlined'}
                helperText={'Введите цену товара'}
                autoComplete={'off'}
                value={productPrice}
                onChange={(ev) => {
                    setProductPrice(Number(ev.target.value));
                }}
                fullWidth={true}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={published}
                        onClick={() => setPublished(!published)}
                    />
                }
                label="Опубликовать товар"
            />
            <Button
                onClick={() => {
                    seller &&
                        createProduct({
                            name: productName,
                            price: productPrice,
                            description: productDescription,
                            published: published,
                            seller: seller,
                            accessToken: accessToken ?? '',
                        });
                }}
            >
                Сохранить
            </Button>
        </Box>
    );
};

export type ProductDTO = {
    name: string;
    price: number;
    categories: string[];
    properties: string[];
    seller: string;
    description: string;
    published: boolean;
};
