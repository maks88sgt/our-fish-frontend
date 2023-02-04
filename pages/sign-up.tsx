import Head from 'next/head';

import { Header } from '../components/Header';
import styles from '../styles/Home.module.css';
import { Footer } from '../components/Footer';
import { Box } from '@mui/system';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSignInMutation, useSignUpMutation } from '../store/auth/authApi';
import { setUserData } from '../store/auth/authActions';
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

export default function SignUp() {
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

    const [emailHelperText, setEmailHelperText] = useState('');
    const [email, setEmail] = useState('');

    const validateEmail = (email: string) => {
        if (
            !email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
        ) {
            setEmailHelperText('Введите корректный адрес электронной почты');
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

    const [repeatPasswordHelperText, setRepeatPasswordHelperText] =
        useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const validateRepeatPassword = (
        password: string,
        repeatPassword: string,
    ) => {
        if (password !== repeatPassword) {
            setRepeatPasswordHelperText('Введенные пароли должны совпадать');
        }
    };

    const [signUp, signUpResponse] = useSignUpMutation();
    const [signIn, signInResponse] = useSignInMutation();

    useEffect(() => {
        if (signUpResponse.isSuccess) {
            signIn({ username, password });
        }
    }, [signUpResponse]);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (signInResponse.isSuccess) {
            dispatch(
                setUserData({
                    accessToken: signInResponse.data.accessToken,
                    username: signInResponse.data.username,
                    roles: signInResponse.data.roles,
                    seller: signInResponse.data.seller,
                }),
            );
            router.push('/');
        }
    }, [signUpResponse]);

    return (
        <Box className={styles.container}>
            <Head>
                <title>Наша рыба</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <FormControl
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '18px',
                        marginTop: '24px',
                        width: ['80vw', '80vw', '50vw'],
                    }}
                >
                    <Typography component={'h1'}>
                        Регистрация нового пользователя
                    </Typography>
                    <>
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
                    </>
                    <>
                        <TextField
                            id="email-input"
                            label={'Адрес электронной почты'}
                            aria-describedby="email-helper-text"
                            variant={'outlined'}
                            helperText={emailHelperText}
                            error={!!emailHelperText}
                            autoComplete={'off'}
                            value={email}
                            onFocus={() => setEmailHelperText('')}
                            onChange={(ev) => {
                                setEmail(ev.target.value);
                            }}
                            fullWidth={true}
                        />
                    </>
                    <>
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
                    </>
                    <>
                        <TextField
                            autoComplete={'off'}
                            type={'password'}
                            id="password-input"
                            label={'Повторите пароль'}
                            aria-describedby="password-helper-text"
                            variant={'outlined'}
                            helperText={repeatPasswordHelperText}
                            error={!!repeatPasswordHelperText}
                            value={repeatPassword}
                            onFocus={() => setRepeatPasswordHelperText('')}
                            onChange={(ev) => {
                                setRepeatPassword(ev.target.value);
                            }}
                            fullWidth={true}
                        />
                    </>
                    <Button
                        sx={{ width: '50%' }}
                        variant={'contained'}
                        onClick={() => {
                            validateUsername(username);
                            validateEmail(email);
                            validatePassword(password);
                            validateRepeatPassword(password, repeatPassword);
                            if (
                                usernameHelperText ||
                                emailHelperText ||
                                passwordHelperText ||
                                repeatPasswordHelperText
                            ) {
                                return;
                            }
                            signUp({ username, email, password });
                        }}
                    >
                        Зарегистрироваться
                    </Button>
                </FormControl>
            </main>
            <Footer />
        </Box>
    );
}
