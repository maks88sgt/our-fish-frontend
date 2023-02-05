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
    const [purchaseUsernameError, setPurchaseUsernameError] = useState('');
    const validateName = () => {
        if (purchaseUsername.length < 3) {
            setPurchaseUsernameError('Имя должно быть не короче 3 символов');
        }
        if (!/^[а-яА-Я ]*$/g.test(purchaseUsername)) {
            setPurchaseUsernameError(
                'Имя пользователя может содержать только буквы русского алфавита и пробелы',
            );
        }
    };

    const [purchasePhone, setPurchasePhone] = useState('');
    const [purchasePhoneError, setPurchasePhoneError] = useState('');
    const validatePhone = () => {
        if (
            purchaseUsername.length !== 9 ||
            purchaseUsername[0] !== '+' ||
            purchaseUsername[1] !== '7'
        ) {
            setPurchasePhoneError(
                'Номер должен начинаться с +7 и содержать 9 знаков',
            );
        }
    };

    const [purchaseEmail, setPurchaseEmail] = useState('');
    const [purchaseEmailError, setPurchaseEmailError] = useState('');
    const validateEmail = () => {
        if (
            !purchaseEmail
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
        ) {
            setPurchaseEmailError('Введите корректный адрес электронной почты');
        }
    };

    const [saveUserData, setSaveUserData] = useState(false);

    const [purchaseCity, setPurchaseCity] = useState('');
    const [purchaseCityError, setPurchaseCityError] = useState('');
    const validateCity = () => {
        if (!purchaseCity.length) {
            setPurchaseCityError('Поле город не должно быть пустым');
        }
    };

    const [purchaseStreet, setPurchaseStreet] = useState('');
    const [purchaseStreetError, setPurchaseStreetError] = useState('');
    const validateStreet = () => {
        if (!purchaseStreet.length) {
            setPurchaseStreetError('Поле улица не должно быть пустым');
        }
    };

    const [purchaseEntrance, setPurchaseEntrance] = useState('');
    const [purchaseHouse, setPurchaseHouse] = useState('');
    const [purchaseHouseError, setPurchaseHouseError] = useState('');
    const validateHouse = () => {
        if (!purchaseHouse.length || !parseInt(purchaseHouse)) {
            setPurchaseStreetError(
                'Поле дом не должно быть пустым и должно начинаться с цифры',
            );
        }
    };
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
                    error={!!purchaseUsernameError}
                    helperText={purchaseUsernameError}
                    onFocus={() => setPurchaseUsernameError('')}
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
                    error={!!purchasePhoneError}
                    helperText={purchasePhoneError}
                    onFocus={() => setPurchasePhoneError('')}
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
                    error={!!purchaseEmailError}
                    helperText={purchaseEmailError}
                    onFocus={() => setPurchaseEmailError('')}
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
                        error={!!purchaseCityError}
                        helperText={purchaseCityError}
                        onFocus={() => setPurchaseCityError('')}
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
                        error={!!purchaseStreetError}
                        helperText={purchaseStreetError}
                        onFocus={() => setPurchaseStreetError('')}
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
                        error={!!purchaseHouseError}
                        helperText={purchaseHouseError}
                        onFocus={() => setPurchaseHouseError('')}
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
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            validateName();
                            validatePhone();
                            validateEmail();
                            validateCity();
                            validateStreet();
                            validateHouse();
                            if (
                                purchaseUsernameError ||
                                purchasePhoneError ||
                                purchaseEmailError ||
                                purchaseCityError ||
                                purchaseStreetError ||
                                purchaseHouseError
                            ) {
                                return;
                            }
                        }}
                    >
                        Оформить заказ
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
