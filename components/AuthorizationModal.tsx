import {
    Box,
    Button,
    IconButton,
    Link,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useSignInMutation } from '../store/auth/authApi';
import { setUserData } from '../store/auth/authActions';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

export const AuthorizationModal = ({
    modalIsOpen,
    setModalIsOpen,
}: {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<boolean>;
}) => {
    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [username, setUsername] = useState('');

    const validateUsername = (name: string) => {
        if (name.length < 3) {
            setUsernameHelperText(
                'Имя пользователя должно содержать боллее 3 символов',
            );
        }
        if (!/^[a-zA-Zа-яА-Я ]*$/g.test(name)) {
            setUsernameHelperText(
                'Имя пользователя может содержать только буквы и пробелы',
            );
        }
    };

    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [password, setPassword] = useState('');

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            setPasswordHelperText(
                'Пароль должен иметь длину не менее 6 символов',
            );
        }
    };

    const [signIn, signInResponse] = useSignInMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (signInResponse.isSuccess) {
            setModalIsOpen(false);
            dispatch(
                setUserData({
                    accessToken: signInResponse.data.accessToken,
                    username: signInResponse.data.username,
                    roles: signInResponse.data.roles,
                    seller: signInResponse.data.seller,
                }),
            );
            return;
        }
        if (signInResponse.isError) {
            setPasswordHelperText('Неправильное имя пользователя или пароль');
            setUsernameHelperText('Неправильное имя пользователя или пароль');
        }
    }, [signInResponse]);

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
                        setUsername('');
                        setPassword('');
                        setModalIsOpen(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '48px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Авторизация</Typography>
                    <TextField
                        id="username-input"
                        label={'Имя пользователя'}
                        aria-describedby="username-helper-text"
                        variant={'outlined'}
                        helperText={usernameHelperText}
                        error={!!usernameHelperText}
                        autoComplete={'off'}
                        value={username}
                        onFocus={() => setUsernameHelperText('')}
                        onChange={(ev) => {
                            setUsername(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                    <TextField
                        autoComplete={'off'}
                        type={'password'}
                        id="password-input"
                        label={'Введите пароль'}
                        aria-describedby="password-helper-text"
                        variant={'outlined'}
                        helperText={passwordHelperText}
                        error={!!passwordHelperText}
                        value={password}
                        onFocus={() => setPasswordHelperText('')}
                        onChange={(ev) => {
                            setPassword(ev.target.value);
                        }}
                        fullWidth={true}
                    />
                    <Box>
                        Если у вас еще нет аккаунта{' '}
                        <Link href={'/sign-up'}>создайте его</Link>
                    </Box>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            validateUsername(username);
                            validatePassword(password);
                            if (usernameHelperText || passwordHelperText) {
                                return;
                            }
                            signIn({ username, password });
                        }}
                    >
                        Авторизоваться
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};
