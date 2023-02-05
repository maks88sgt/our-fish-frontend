import { Box } from '@mui/system';
import {
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export const PurchaseForm = () => {
    const [purchaseUsername, setPurchaseUsername] = useState('');
    const [purchasePhone, setPurchasePhone] = useState('');
    const [purchaseEmail, setPurchaseEmail] = useState('');
    const [saveUserData, setSaveUserData] = useState(false);
    const [purchaseCity, setPurchaseCity] = useState('');
    const [purchaseStreet, setPurchaseStreet] = useState('');
    const [purchaseEntrance, setPurchaseEntrance] = useState('');
    const [purchaseHouse, setPurchaseHouse] = useState('');
    const [purchaseApartments, setPurchaseApartments] = useState('');
    const [purchaseComment, setPurchaseComment] = useState('');

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '40px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Typography fontSize={'24px'} fontWeight={400}>
                    Контактные данные
                </Typography>
                <TextField
                    label={'ФИО'}
                    variant={'outlined'}
                    autoComplete={'off'}
                    value={purchaseUsername}
                    onChange={(ev) => {
                        setPurchaseUsername(ev.target.value);
                    }}
                    fullWidth={true}
                />
                <TextField
                    label={'Телефон'}
                    variant={'outlined'}
                    autoComplete={'off'}
                    value={purchasePhone}
                    onChange={(ev) => {
                        setPurchasePhone(ev.target.value);
                    }}
                    fullWidth={true}
                />
                <TextField
                    label={'Email'}
                    variant={'outlined'}
                    autoComplete={'off'}
                    value={purchaseEmail}
                    onChange={(ev) => {
                        setPurchaseEmail(ev.target.value);
                    }}
                    fullWidth={true}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={saveUserData}
                            onClick={() => setSaveUserData(!saveUserData)}
                        />
                    }
                    label="Сохранить данные для последующих заказов"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Typography fontSize={'24px'} fontWeight={400}>
                    Адрес доставки
                </Typography>
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}
                >
                    <TextField
                        label={'Город'}
                        variant={'outlined'}
                        autoComplete={'off'}
                        value={purchaseCity}
                        onChange={(ev) => {
                            setPurchaseCity(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                    <TextField
                        label={'Улица'}
                        variant={'outlined'}
                        autoComplete={'off'}
                        value={purchaseStreet}
                        onChange={(ev) => {
                            setPurchaseStreet(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                </Box>
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}
                >
                    <TextField
                        label={'Дом'}
                        variant={'outlined'}
                        autoComplete={'off'}
                        value={purchaseHouse}
                        onChange={(ev) => {
                            setPurchaseHouse(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                    <TextField
                        label={'Подъезд'}
                        variant={'outlined'}
                        autoComplete={'off'}
                        value={purchaseEntrance}
                        onChange={(ev) => {
                            setPurchaseEntrance(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                    <TextField
                        label={'Квартира'}
                        variant={'outlined'}
                        autoComplete={'off'}
                        value={purchaseApartments}
                        onChange={(ev) => {
                            setPurchaseApartments(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                </Box>
                <TextField
                    label={'Комментарий к заказу'}
                    variant={'outlined'}
                    autoComplete={'off'}
                    value={purchaseComment}
                    multiline={true}
                    rows={3}
                    onChange={(ev) => {
                        setPurchaseComment(ev.target.value);
                    }}
                    fullWidth={true}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <Button variant={'contained'}>Оформить заказ</Button>
                </Box>
            </Box>
        </Box>
    );
};
