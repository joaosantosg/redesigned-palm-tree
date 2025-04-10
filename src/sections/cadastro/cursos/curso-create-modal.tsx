import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

interface CursoCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CursoCreateModal({ open, onClose, onSuccess }: CursoCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    coordenador: '',
    descricao: '',
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
      // await CursoService.criar(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar curso');
    } finally {
      loading.onFalse();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Curso</DialogTitle>
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
            label="Código"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Coordenador"
            name="coordenador"
            value={formData.coordenador}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            margin="dense"
            multiline
            rows={3}
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