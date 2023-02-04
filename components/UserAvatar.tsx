import { stringAvatar } from '../utils/stringAvatar';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Box } from '@mui/system';
import { setUserData } from '../store/auth/authActions';
import { useDispatch } from 'react-redux';

export const UserAvatar = ({ username }: { username: string }) => {
    const [menuIsOpen, setMenuIsOpen] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();

    return (
        <>
            <IconButton
                onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                    setMenuIsOpen(ev.currentTarget);
                }}
            >
                <Avatar {...stringAvatar(username)} />
            </IconButton>
            <Menu
                open={Boolean(menuIsOpen)}
                anchorEl={menuIsOpen}
                onClose={() => setMenuIsOpen(null)}
            >
                <MenuItem>
                    <Box
                        onClick={() =>
                            dispatch(
                                setUserData({
                                    username: null,
                                    accessToken: null,
                                    roles: [],
                                }),
                            )
                        }
                    >
                        Выйти
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
};
