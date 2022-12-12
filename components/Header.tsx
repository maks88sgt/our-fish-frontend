import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import logo from '../assets/logo.svg';
import Image from 'next/image';

export const Header = () => {
    return <AppBar color={'transparent'} position='static' sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        justifyContent: 'space-between',
        backgroundColor: "#59a8ed"
    }}
    >
        <Image src={logo} width={150} height={55} alt={'logo'} />
        <Toolbar variant='dense'>
            {/*<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>*/}
            <Tabs>
                <Tab label='Магазин' />
                <Tab label='Корзина' />
                <Tab label=' О проекте' />
            </Tabs>
        </Toolbar>
    </AppBar>;
};
