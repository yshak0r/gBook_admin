import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c2c2c',
      light: '#4a4a4a',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b6b6b',
      light: '#8a8a8a',
      dark: '#4a4a4a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#6b6b6b',
    },
    success: {
      main: '#4a4a4a',
      light: '#6b6b6b',
      dark: '#2c2c2c',
    },
    warning: {
      main: '#757575',
      light: '#9e9e9e',
      dark: '#424242',
    },
    error: {
      main: '#424242',
      light: '#616161',
      dark: '#212121',
    },
    info: {
      main: '#616161',
      light: '#757575',
      dark: '#424242',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    divider: '#e0e0e0',
    action: {
      hover: '#f5f5f5',
      selected: '#eeeeee',
      disabled: '#bdbdbd',
      disabledBackground: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#2c2c2c',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#2c2c2c',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2c2c2c',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2c2c2c',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2c2c2c',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2c2c2c',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#2c2c2c',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6b6b6b',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1a1a1a',
          },
        },
        outlined: {
          borderColor: '#e0e0e0',
          color: '#2c2c2c',
          '&:hover': {
            borderColor: '#bdbdbd',
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2c2c2c',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
        },
        colorSecondary: {
          backgroundColor: '#6b6b6b',
          color: '#ffffff',
        },
        colorSuccess: {
          backgroundColor: '#4a4a4a',
          color: '#ffffff',
        },
        colorWarning: {
          backgroundColor: '#757575',
          color: '#ffffff',
        },
        colorError: {
          backgroundColor: '#424242',
          color: '#ffffff',
        },
        colorInfo: {
          backgroundColor: '#616161',
          color: '#ffffff',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#2c2c2c',
            borderBottom: '1px solid #e0e0e0',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#fafafa',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#fafafa',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2c2c2c',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          '&.Mui-selected': {
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1a1a1a',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
        },
        indicator: {
          backgroundColor: '#2c2c2c',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: '#6b6b6b',
          '&.Mui-selected': {
            color: '#2c2c2c',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#6b6b6b',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            color: '#2c2c2c',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e0e0e0',
      light: '#f5f5f5',
      dark: '#bdbdbd',
      contrastText: '#2c2c2c',
    },
    secondary: {
      main: '#bdbdbd',
      light: '#e0e0e0',
      dark: '#9e9e9e',
      contrastText: '#2c2c2c',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
    },
    success: {
      main: '#bdbdbd',
      light: '#e0e0e0',
      dark: '#9e9e9e',
    },
    warning: {
      main: '#9e9e9e',
      light: '#bdbdbd',
      dark: '#757575',
    },
    error: {
      main: '#757575',
      light: '#9e9e9e',
      dark: '#616161',
    },
    info: {
      main: '#9e9e9e',
      light: '#bdbdbd',
      dark: '#757575',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    divider: '#424242',
    action: {
      hover: '#2a2a2a',
      selected: '#333333',
      disabled: '#616161',
      disabledBackground: '#2a2a2a',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#e0e0e0',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#e0e0e0',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#e0e0e0',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#e0e0e0',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#e0e0e0',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#e0e0e0',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#e0e0e0',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#bdbdbd',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          },
        },
        contained: {
          backgroundColor: '#e0e0e0',
          color: '#2c2c2c',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
        outlined: {
          borderColor: '#424242',
          color: '#e0e0e0',
          '&:hover': {
            borderColor: '#616161',
            backgroundColor: '#2a2a2a',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1e1e1e',
          border: '1px solid #424242',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#1e1e1e',
            '& fieldset': {
              borderColor: '#424242',
            },
            '&:hover fieldset': {
              borderColor: '#616161',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e0e0e0',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#e0e0e0',
          color: '#2c2c2c',
        },
        colorSecondary: {
          backgroundColor: '#bdbdbd',
          color: '#2c2c2c',
        },
        colorSuccess: {
          backgroundColor: '#bdbdbd',
          color: '#2c2c2c',
        },
        colorWarning: {
          backgroundColor: '#9e9e9e',
          color: '#2c2c2c',
        },
        colorError: {
          backgroundColor: '#757575',
          color: '#ffffff',
        },
        colorInfo: {
          backgroundColor: '#9e9e9e',
          color: '#2c2c2c',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#e0e0e0',
            borderBottom: '1px solid #424242',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#2a2a2a',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#252525',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          borderBottom: '1px solid #424242',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          borderRight: '1px solid #424242',
          boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: '#2a2a2a',
          },
          '&.Mui-selected': {
            backgroundColor: '#e0e0e0',
            color: '#2c2c2c',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiListItemIcon-root': {
              color: '#2c2c2c',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          backgroundColor: '#1e1e1e',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          border: '1px solid #424242',
          borderRadius: 8,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #424242',
        },
        indicator: {
          backgroundColor: '#e0e0e0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: '#bdbdbd',
          '&.Mui-selected': {
            color: '#e0e0e0',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e0e0',
          color: '#2c2c2c',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#bdbdbd',
          '&:hover': {
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          },
        },
      },
    },
  },
});