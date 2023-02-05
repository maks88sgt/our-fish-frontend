import {
    Box,
    Button,
    CardMedia,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import {
    useCreateProductMutation,
    useUpdateProductMutation,
} from '../store/products/productsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CloseIcon from '@mui/icons-material/Close';
import { Categories, ProductDTO, Units } from '../types/types';
import { getCategory } from '../utils/getCategory';
import { getUnits } from '../utils/getUnits';

export const ProductEditor = ({
    editorIsOpen,
    setEditorIsOpen,
    product,
}: {
    editorIsOpen: boolean;
    setEditorIsOpen: Dispatch<boolean>;
    product?: ProductDTO;
}) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [published, setPublished] = useState(false);
    const [units, setUnits] = useState(Units.pack);
    const [category, setCategory] = useState(Categories.frozen);

    useEffect(() => {
        product?.name && setProductName(product.name);
        product?.price && setProductPrice(product.price);
        product?.description && setProductDescription(product.description);
        product?.published && setPublished(product.published);
        product?.units && setUnits(product.units);
        product?.category && setCategory(product.category);
    }, [product]);

    const resetAllData = () => {
        setCategory(Categories.frozen);
        setProductName('');
        setPublished(false);
        setProductPrice(0);
        setProductDescription('');
        setUnits(Units.kg);
    };

    const { accessToken, seller } = useSelector(
        (state: RootState) => state.auth,
    );

    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    return (
        <Modal
            open={editorIsOpen}
            onClose={() => setEditorIsOpen(false)}
            sx={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '24px',
                    backgroundColor: 'white',
                    position: 'relative',
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={() => {
                        resetAllData();
                        setEditorIsOpen(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h3">Добавление нового товара</Typography>
                <Box
                    sx={{
                        padding: '32px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        gap: '16px',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="250"
                            width={'250'}
                            image=""
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" component="span">
                                Добавить изображение
                            </Button>
                        </label>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'row',
                                gap: '24px',
                            }}
                        >
                            <TextField
                                label={'Введите название товара'}
                                variant={'outlined'}
                                autoComplete={'off'}
                                value={productName}
                                onChange={(ev) => {
                                    setProductName(ev.target.value);
                                }}
                                fullWidth={true}
                            />
                            <FormControl fullWidth={true}>
                                <InputLabel id="demo-simple-select-label">
                                    Выберете категорию товара
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Выберете категорию товара"
                                    onChange={(event) =>
                                        setCategory(
                                            event.target.value as Categories,
                                        )
                                    }
                                >
                                    <MenuItem value={Categories.cooled}>
                                        {getCategory(Categories.cooled)}
                                    </MenuItem>
                                    <MenuItem value={Categories.frozen}>
                                        {getCategory(Categories.frozen)}
                                    </MenuItem>
                                    <MenuItem value={Categories.smoked}>
                                        {getCategory(Categories.smoked)}
                                    </MenuItem>
                                    <MenuItem value={Categories.dried}>
                                        {getCategory(Categories.dried)}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            label={'Введите подробное описание товара'}
                            variant={'outlined'}
                            multiline={true}
                            autoComplete={'off'}
                            value={productDescription}
                            onChange={(ev) => {
                                setProductDescription(ev.target.value);
                            }}
                            minRows={3}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                            }}
                        >
                            <TextField
                                label={'Введите цену товара'}
                                variant={'outlined'}
                                autoComplete={'off'}
                                value={productPrice}
                                onChange={(ev) => {
                                    setProductPrice(Number(ev.target.value));
                                }}
                                fullWidth={true}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Выберете единицы измерения
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={units}
                                    label=" Выберете единицы измерения"
                                    onChange={(event) =>
                                        setUnits(event.target.value as Units)
                                    }
                                >
                                    <MenuItem value={Units.piece}>
                                        {getUnits(Units.piece)}
                                    </MenuItem>
                                    <MenuItem value={Units.kg}>
                                        {getUnits(Units.kg)}
                                    </MenuItem>
                                    <MenuItem value={Units.pack}>
                                        {getUnits(Units.pack)}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={published}
                                    onClick={() => setPublished(!published)}
                                />
                            }
                            label="Опубликовать товар"
                        />
                    </Box>
                </Box>
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}
                >
                    <Button
                        variant={'outlined'}
                        onClick={() => {
                            resetAllData();
                            setEditorIsOpen(false);
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            seller &&
                            productName &&
                            productDescription &&
                            !product
                                ? createProduct({
                                      name: productName,
                                      price: productPrice,
                                      description: productDescription,
                                      published: published,
                                      seller: seller,
                                      category: category,
                                      units: units,
                                      accessToken: accessToken ?? '',
                                  })
                                : updateProduct({
                                      _id: product?._id,
                                      name: productName,
                                      price: productPrice,
                                      description: productDescription,
                                      published: published,
                                      seller: seller as string,
                                      category: category,
                                      units: units,
                                      accessToken: accessToken ?? '',
                                  });
                            resetAllData();
                            setEditorIsOpen(false);
                        }}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};
