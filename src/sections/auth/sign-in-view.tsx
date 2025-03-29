import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/contexts/auth-context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("Esqueceu sua senha?");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    matricula: '1234567890',
    senha: 'admin'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await login(formData.matricula, formData.senha);
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [formData, login]);

  const handleForgotPassword = () => {
    setForgotPasswordMessage("Sinto muito, mas não estou sendo pago e não tenho como te ajudar com isso. Entre em contato com alguém do setor de TI. 🤷‍♂️");
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="matricula"
        label="Matrícula"
        value={formData.matricula}
        onChange={handleInputChange}
        inputProps={{ maxLength: 10 }}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link 
        variant="body2" 
        color="inherit" 
        sx={{ mb: 1.5, cursor: 'pointer' }}
        onClick={handleForgotPassword}
      >
        {forgotPasswordMessage}
      </Link>

      <TextField
        fullWidth
        name="senha"
        label="Senha"
        value={formData.senha}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={loading}
      >
        Entrar
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Reserva de Salas</Typography>
        <Typography variant="body2" color="text.secondary">
          Acesse o sistema com sua matrícula
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
