import type { Breakpoint } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { bgBlur } from 'src/theme/styles';
import { useAuth } from 'src/contexts/auth-context';

import { UserMenu } from 'src/components/user/user-menu';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
};

export function HeaderSection({ sx, layoutQuery = 'md', ...other }: HeaderSectionProps) {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <AppBar
      position="sticky"
      className={layoutClasses.header}
      sx={{
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        boxShadow: 'none',
        height: 64,
        zIndex: theme.zIndex.appBar,
        ...sx,
      }}
      {...other}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            {user?.nome}
          </Typography>
        </Box>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
