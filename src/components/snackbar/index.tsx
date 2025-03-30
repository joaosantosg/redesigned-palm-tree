import { useSnackbar as useNotistack } from 'notistack';

export function useSnackbar() {
  const { enqueueSnackbar } = useNotistack();

  return {
    enqueueSnackbar,
  };
} 