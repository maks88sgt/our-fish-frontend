import { AppBar, Divider, IconButton, Menu, MenuItem, Tab, Tabs, useMediaQuery } from '@mui/material';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MouseEvent, useState } from 'react';


const enum Paths {
    index = '/',
    cart = '/cart',
    info = '/info'
}

const pathMap = {
    [Paths.index]: 0,
    [Paths.cart]: 1,
    [Paths.info]: 2,
};

export const Header = () => {
    const { asPath } = useRouter();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return <AppBar color={'transparent'} position='static' sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(89,168,237,0.5)',

    }}
    >
        <Image src={logo} width={150} height={55} alt={'logo'} />
        {matches ? <Tabs textColor={'primary'}
                         indicatorColor={'primary'} value={pathMap[asPath as Paths]}>
            <Link href={'/'}><Tab label='Магазин' value={0} /></Link>
            <Link href={'/cart'}><Tab label='Корзина' value={1} /></Link>
            <Link href={'/info'}><Tab label='О нас' value={2} /></Link>
        </Tabs> : <MobileHeader />}
    </AppBar>;
};


const MobileHeader = () => {
    const [menuIsOpen, setMenuIsOpen] = useState<null | HTMLElement>(null);

    console.log(menuIsOpen);

    return <Box><IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}
                            onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                                setMenuIsOpen(ev.currentTarget);
                            }}>
        <MenuIcon fontSize={'large'} />
    </IconButton>
        <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <Link href={'/cart'}><ShoppingCartIcon fontSize={'large'} /></Link>
        </IconButton>
        <Menu open={Boolean(menuIsOpen)} anchorEl={menuIsOpen} onClose={() => setMenuIsOpen(null)}>
            <MenuItem><Link href={'/'}>Магазин</Link></MenuItem><Divider/>
            <MenuItem><Link href={'/cart'}>Корзина</Link></MenuItem><Divider/>
            <MenuItem><Link href={'/info'}>О нас</Link></MenuItem>
        </Menu>
    </Box>;
};
