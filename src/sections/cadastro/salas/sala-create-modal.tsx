import type { IBloco } from 'src/api/services/blocos/bloco.types';
import type { ISalaCreate } from 'src/api/services/salas/sala.types';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/use-boolean';

import { SalaService } from 'src/api/services/salas/sala.service';
import { BlocoService } from 'src/api/services/blocos/bloco.service';

const RECURSOS = [
  'Data Show',
  'Microfone',
  'Computadores',
  'Ar Condicionado',
  'Ventilador',
  'Quadro Branco',
  'Quadro Negro',
  'Sistema de Som',
  'Câmera',
  'Projetor',
  'Mesa para Professor',
  'Cadeiras',
  'Armários',
  'Internet',
  'Tomadas',
];

const CURSOS = [
  'Engenharia de Software',
  'Ciência da Computação',
  'Sistemas de Informação',
  'Engenharia de Computação',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Engenharia Civil',
  'Engenharia Química',
  'Engenharia de Produção',
  'Engenharia de Controle e Automação',
];

interface SalaCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SalaCreateModal({ open, onClose, onSuccess }: SalaCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);
  const [blocos, setBlocos] = useState<IBloco[]>([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState<string[]>([]);

  const [formData, setFormData] = useState<ISalaCreate>({
    bloco_id: '',
    identificacao_sala: '',
    capacidade_maxima: 0,
    recursos: [],
    uso_restrito: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  const handleRecursoToggle = (recurso: string) => {
    const novosRecursos = recursosSelecionados.includes(recurso)
      ? recursosSelecionados.filter((r) => r !== recurso)
      : [...recursosSelecionados, recurso];
    
    setRecursosSelecionados(novosRecursos);
    setFormData((prev) => ({
      ...prev,
      recursos: novosRecursos,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading.onTrue();
      await SalaService.criarSala(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao criar sala');
    } finally {
      loading.onFalse();
    }
  };

  const fetchBlocos = async () => {
    try {
      const params = {
        pagina: 1,
        tamanho: 1000,
      };
      const response = await BlocoService.listarBlocos(params);
      setBlocos(response.dados);
    } catch (err) {
      console.error('Erro ao buscar blocos:', err);
    }
  };

  useEffect(() => {
    fetchBlocos();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Sala</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, mt: 1 }}>
          <Autocomplete
            fullWidth
            options={blocos}
            getOptionLabel={(option) => option.nome}
            value={blocos.find((bloco) => bloco.id === formData.bloco_id) || null}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                bloco_id: newValue?.id || '',
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Bloco"
                margin="dense"
                required
                error={!formData.bloco_id}
              />
            )}
          />

          <TextField
            fullWidth
            label="Identificação"
            name="identificacao_sala"
            value={formData.identificacao_sala}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Capacidade Máxima"
            name="capacidade_maxima"
            type="number"
            value={formData.capacidade_maxima}
            onChange={handleChange}
            margin="dense"
            required
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Recursos Disponíveis
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {RECURSOS.map((recurso) => (
                <Chip
                  key={recurso}
                  label={recurso}
                  onClick={() => handleRecursoToggle(recurso)}
                  color={recursosSelecionados.includes(recurso) ? 'primary' : 'default'}
                  variant={recursosSelecionados.includes(recurso) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                name="uso_restrito"
                checked={formData.uso_restrito}
                onChange={handleChange}
              />
            }
            label="Uso Restrito"
          />

          {formData.uso_restrito && (
            <TextField
              select
              fullWidth
              label="Curso Restrito"
              name="curso_restrito"
              value={formData.curso_restrito}
              onChange={handleChange}
              margin="dense"
              required
            >
              {CURSOS.map((curso) => (
                <MenuItem key={curso} value={curso}>
                  {curso}
                </MenuItem>
              ))}
            </TextField>
          )}

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