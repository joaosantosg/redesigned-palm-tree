import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';

import { useBoolean } from 'src/hooks/use-boolean';

interface SalaCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TIPOS_SALA = [
  'Sala de Aula',
  'Laboratório',
  'Auditório',
  'Sala de Reunião',
];

export function SalaCreateModal({ open, onClose, onSuccess }: SalaCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    capacidade: '',
    bloco: '', // Aqui você pode adicionar um select com os blocos disponíveis
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading.onTrue();
      // Aqui você irá integrar com a API
      // await SalaService.criar(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar sala');
    } finally {
      loading.onFalse();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Sala</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, mt: 1 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            select
            fullWidth
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            margin="dense"
            required
          >
            {TIPOS_SALA.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Capacidade"
            name="capacidade"
            type="number"
            value={formData.capacidade}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Bloco"
            name="bloco"
            value={formData.bloco}
            onChange={handleChange}
            margin="dense"
            required
          />

          {error && (
            <TextField
              error
              fullWidth
              value={error}
              margin="dense"
              disabled
              sx={{ display: error ? 'block' : 'none' }}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <LoadingButton type="submit" variant="contained" loading={loading.value}>
            Criar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
} 