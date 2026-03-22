import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F1729',
    },
    secondary: {
      main: '#2463eb',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
