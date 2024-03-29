import { Dispatch, MouseEvent, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    AppBar,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    useMediaQuery,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logo from '../assets/logo.svg';
import { AuthorizationModal } from './AuthorizationModal';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { UserAvatar } from './UserAvatar';
import { AvailableRoles } from '../store/auth/authReducer';

const enum Paths {
    index = '/',
    cart = '/cart',
    info = '/info',
    management = '/management',
}

const pathMap = {
    [Paths.index]: 0,
    [Paths.cart]: 1,
    [Paths.info]: 2,
    [Paths.management]: 3,
};

export const Header = () => {
    const { asPath } = useRouter();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { username, roles } = useSelector((state: RootState) => {
        return state.auth;
    });

    const isModerator = roles?.some((it) => it === AvailableRoles.moderator);

    return (
        <AppBar
            position="sticky"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 4,
                justifyContent: 'space-between',
            }}
        >
            {matches ? (
                <>
                    <Image src={logo} width={150} height={55} alt={'logo'} />
                    <Tabs
                        indicatorColor={'secondary'}
                        value={isModerator ? '' : pathMap[asPath as Paths]}
                    >
                        {isModerator
                            ? [
                                  { href: '/', label: 'Магазин' },
                                  {
                                      href: '/management',
                                      label: 'Управление товарами',
                                  },
                                  {
                                      href: '/purchases',
                                      label: 'Заказы',
                                  },
                              ].map((item, index) => {
                                  return (
                                      <Link key={item.label} href={item.href}>
                                          <Tab
                                              label={item.label}
                                              value={index}
                                          />
                                      </Link>
                                  );
                              })
                            : [
                                  { href: '/', label: 'Магазин' },
                                  { href: '/cart', label: 'Корзина' },
                                  { href: '/info', label: 'О проекте' },
                              ].map((item, index) => {
                                  return (
                                      <Link key={item.label} href={item.href}>
                                          <Tab
                                              label={item.label}
                                              value={index}
                                          />
                                      </Link>
                                  );
                              })}
                        {!username ? (
                            <IconButton onClick={() => setModalIsOpen(true)}>
                                <LoginIcon
                                    fontSize={'large'}
                                    sx={{ color: 'white' }}
                                />
                            </IconButton>
                        ) : (
                            <UserAvatar username={username} />
                        )}
                    </Tabs>
                </>
            ) : (
                <MobileHeader setModalIsOpen={setModalIsOpen} />
            )}
            <AuthorizationModal
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
            />
        </AppBar>
    );
};

const MobileHeader = ({
    setModalIsOpen,
}: {
    setModalIsOpen: Dispatch<boolean>;
}) => {
    const [menuIsOpen, setMenuIsOpen] = useState<null | HTMLElement>(null);

    const { username, roles } = useSelector((state: RootState) => {
        return state.auth;
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Image src={logo} width={50} height={25} alt={'logo'} />
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                    setMenuIsOpen(ev.currentTarget);
                }}
            >
                <MenuIcon fontSize={'large'} />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <Link href={'/cart'}>
                    <ShoppingCartIcon fontSize={'large'} />
                </Link>
            </IconButton>
            <Menu
                open={Boolean(menuIsOpen)}
                anchorEl={menuIsOpen}
                onClose={() => setMenuIsOpen(null)}
            >
                <MenuItem>
                    <Link href={'/'}>Магазин</Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Link href={'/cart'}>Корзина</Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Link href={'/info'}>О нас</Link>
                </MenuItem>
                {!username ? (
                    <>
                        <Divider />
                        <MenuItem>
                            <Box onClick={() => setModalIsOpen(true)}>
                                Войти
                            </Box>
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
            {username ? <UserAvatar username={username} /> : null}
        </Box>
    );
};
