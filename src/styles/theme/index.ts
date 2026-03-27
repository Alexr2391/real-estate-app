import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F1729',
      dark: '#060d18',
    },
    secondary: {
      main: '#2463eb',
      dark: '#1a4fc4',
    },
    neutral: {
      main: '#F3F5F7',
      dark: '#d8d9db',
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
