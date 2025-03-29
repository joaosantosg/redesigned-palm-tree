import { useState } from 'react';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'src/contexts/auth-context';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const getInitials = (name: string) => name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <IconButton 
        onClick={handleClick}
        sx={{ 
          p: 0.5,
          '&:hover': { bgcolor: 'transparent' }
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          {user?.nome ? getInitials(user.nome) : '??'}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 100,
              boxShadow: (theme) => theme.customShadows.dropdown,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1,
            px: 2,
            typography: 'body2',
            color: 'error.main',
            '&:hover': { bgcolor: 'error.lighter' }
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </>
  );
} 