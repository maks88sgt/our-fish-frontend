import '../styles/globals.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

const theme = createTheme({
    palette: { primary: { main: '#1E8FFF' }, secondary: { main: '#FFFFFF' } },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    fontSize: 18
                }
            }
        }
    }
});

export default function App({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>;
}
