import 'src/global.css';

import { Router } from 'src/routes/routes';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { AuthProvider } from 'src/contexts/auth-context';
import { ThemeProvider } from 'src/theme/theme-provider';


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
