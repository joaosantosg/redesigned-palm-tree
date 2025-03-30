import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <HelmetProvider>
        <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <Suspense>
            <App />
          </Suspense>
        </LocalizationProvider>
      </BrowserRouter>
    </HelmetProvider>
    </SnackbarProvider>
  </StrictMode>
);
