import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getCategory } from '../utils/getCategory';
import { getUnits } from '../utils/getUnits';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    decreaseProductQuantity,
    increaseProductQuantity,
} from '../store/cart/cartActions';

export const CartProductsTable = () => {
    const { products } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Наимерование товара</TableCell>
                        <TableCell align="left">Категория товара</TableCell>
                        <TableCell align="center">Цена</TableCell>
                        <TableCell align="center">Количество</TableCell>
                        <TableCell align="center">Сумма</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => {
                        return (
                            <TableRow
                                key={product.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="left">
                                    {getCategory(product.category)}
                                </TableCell>
                                <TableCell align="center">
                                    {product.price}&nbsp;руб/
                                    {getUnits(product.units)}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() =>
                                            dispatch(
                                                decreaseProductQuantity(
                                                    product,
                                                ),
                                            )
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    {product.quantity}
                                    <IconButton
                                        onClick={() =>
                                            dispatch(
                                                increaseProductQuantity(
                                                    product,
                                                ),
                                            )
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    {product.price * product.quantity}&nbsp;руб
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
