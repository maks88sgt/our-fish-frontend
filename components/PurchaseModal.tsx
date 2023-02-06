import {
    Box,
    Button,
    IconButton,
    Link,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch } from 'react';
import { CartDTO, ProductDTO } from '../types/types';

export const PurchaseModal = ({
    modalData,
    modalIsOpen,
    setModalIsOpen,
}: {
    modalData: CartDTO | null;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<boolean>;
}) => {
    const { products, contactInfo, shippingAddress, status } =
        modalData as CartDTO;

    return (
        <Modal
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                    minWidth: '50vw',
                    padding: '80px',
                    position: 'relative',
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={() => {
                        setModalIsOpen(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography>Детали заказа</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование товара</TableCell>
                                <TableCell align="left">Количество</TableCell>
                                <TableCell align="center">Сумма</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.map((product) => {
                                return (
                                    <TableRow
                                        key={product._id}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {product.quantity}
                                        </TableCell>
                                        <TableCell align="center">
                                            {product.price * product.quantity}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box>
                    Итого:{' '}
                    {products.reduce((acc, item) => {
                        return acc + item.price * item.quantity;
                    }, 0)}
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <Typography fontWeight={600}>
                            Контактные данные
                        </Typography>
                        <Typography>ФИО: {contactInfo.name}</Typography>
                        <Typography>Телефон: {contactInfo.phone}</Typography>
                        <Typography>Email: {contactInfo.email}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <Typography fontWeight={600}>Адрес доставки</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                            }}
                        >
                            <Typography>
                                Город: {shippingAddress.city}
                            </Typography>
                            <Typography>
                                Улица: {shippingAddress.street}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                            }}
                        >
                            <Typography>
                                Дом: {shippingAddress.house}
                            </Typography>
                            <Typography>
                                Подъезд: {shippingAddress.entrance}
                            </Typography>
                            <Typography>
                                Квартира: {shippingAddress.apartment}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
};
