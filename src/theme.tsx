import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#9198e5',
        },
        secondary: {
            main: '#e66465',
        },
    },
    direction: 'rtl',
    typography: {
        "fontFamily": `'Rubik', sans-serif;`,
        "fontSize": 16,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
    },
});