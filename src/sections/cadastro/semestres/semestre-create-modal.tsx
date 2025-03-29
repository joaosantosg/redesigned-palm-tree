import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

import { useBoolean } from 'src/hooks/use-boolean';

interface SemestreCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SemestreCreateModal({ open, onClose, onSuccess }: SemestreCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    dataInicio: null,
    dataFim: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleDateChange = (field: string) => (date: Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading.onTrue();
      // Aqui você irá integrar com a API
      // await SemestreService.criar(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar semestre');
    } finally {
      loading.onFalse();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Semestre</DialogTitle>
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

          <DatePicker
            label="Data de Início"
            value={formData.dataInicio}
            onChange={handleDateChange('dataInicio')}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
                required: true,
              },
            }}
          />

          <DatePicker
            label="Data de Fim"
            value={formData.dataFim}
            onChange={handleDateChange('dataFim')}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
                required: true,
              },
            }}
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