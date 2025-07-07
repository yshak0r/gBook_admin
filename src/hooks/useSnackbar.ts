import { useSnackbar as useNotistackSnackbar } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

  const toast = {
    success: (message: string) => enqueueSnackbar(message, { variant: 'success' }),
    error: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
    warning: (message: string) => enqueueSnackbar(message, { variant: 'warning' }),
    info: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
  };

  return { toast, enqueueSnackbar, closeSnackbar };
};