import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PermissionDeniedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
        bgcolor: 'grey.50',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2, color: 'error.main' }}>
        Permissão Insuficiente
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'grey.600', textAlign: 'center' }}>
        Você não tem permissão para acessar esta página.
        <br />
        Apenas administradores podem acessar este recurso.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        Voltar para o Dashboard
      </Button>
    </Box>
  );
} 