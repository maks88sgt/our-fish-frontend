import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: { primary: { main: '#1E8FFF' }, secondary: { main: '#FFFFFF' } },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    fontSize: 18,
                },
            },
        },
    },
});
