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

interface DisciplinaCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DisciplinaCreateModal({ open, onClose, onSuccess }: DisciplinaCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    cargaHoraria: '',
    curso: '', // Aqui você pode adicionar um select com os cursos disponíveis
    professor: '',
    tipo: '',
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
      // await DisciplinaService.criar(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar disciplina');
    } finally {
      loading.onFalse();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Disciplina</DialogTitle>
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
            label="Carga Horária"
            name="cargaHoraria"
            type="number"
            value={formData.cargaHoraria}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Curso"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Professor"
            name="professor"
            value={formData.professor}
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
            <MenuItem value="Obrigatória">Obrigatória</MenuItem>
            <MenuItem value="Optativa">Optativa</MenuItem>
          </TextField>

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