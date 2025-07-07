import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Header />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              p: 3,
              backgroundColor: 'background.default'
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </SnackbarProvider>
  );
}