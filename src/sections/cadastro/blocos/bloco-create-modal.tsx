import type { IBlocoCreate } from 'src/api/services/blocos/bloco.types';

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { BlocoService } from 'src/api/services/blocos/bloco.service';

interface BlocoCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BlocoCreateModal({ open, onClose, onSuccess }: BlocoCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<IBlocoCreate>({
    nome: '',
    identificacao: '',
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
      await BlocoService.criarBloco(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao criar bloco');
    } finally {
      loading.onFalse();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Bloco</DialogTitle>
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
            fullWidth
            label="Identificação"
            name="identificacao"
            inputProps={{
              maxLength: 20,
            }}
            value={formData.identificacao}
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