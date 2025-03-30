import type { IBloco } from 'src/api/services/blocos/bloco.types';
import type { ISala, ISalaUpdate } from 'src/api/services/salas/sala.types';

import { useState, useEffect, useCallback } from 'react';

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

interface SalaDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  salaId: string;
}

export function SalaDetailsModal({ open, onClose, onSuccess, salaId }: SalaDetailsModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);
  const [blocos, setBlocos] = useState<IBloco[]>([]);
  const [sala, setSala] = useState<ISala | null>(null);
  const [recursosSelecionados, setRecursosSelecionados] = useState<string[]>([]);

  const [formData, setFormData] = useState<ISalaUpdate>({
    identificacao_sala: '',
    capacidade_maxima: 0,
    recursos: [],
    uso_restrito: false,
  });

  const fetchSala = useCallback(async () => {
    try {
      loading.onTrue();
      const response = await SalaService.obterSala(salaId);
      setSala(response.dados);
      setFormData({
        identificacao_sala: response.dados.identificacao_sala,
        capacidade_maxima: response.dados.capacidade_maxima,
        recursos: response.dados.recursos,
        uso_restrito: response.dados.uso_restrito,
        curso_restrito: response.dados.curso_restrito,
      });
      setRecursosSelecionados(response.dados.recursos);
    } catch (err) {
      console.error('Erro ao buscar sala:', err);
      setError('Erro ao carregar dados da sala');
    } finally {
      loading.onFalse();
    }
  }, [salaId, loading]);

  useEffect(() => {
    if (open) {
      fetchSala();
      fetchBlocos();
    }
  }, [open, salaId, fetchSala]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((formPrev) => ({
      ...formPrev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  const handleRecursoToggle = (recurso: string) => {
    setRecursosSelecionados((prev) => {
      const novosRecursos = prev.includes(recurso)
        ? prev.filter((r) => r !== recurso)
        : [...prev, recurso];
      
      setFormData((formPrev) => ({
        ...formPrev,
        recursos: novosRecursos,
      }));
      
      return novosRecursos;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading.onTrue();
      await SalaService.atualizarSala(salaId, formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao atualizar sala');
    } finally {
      loading.onFalse();
    }
  };

  if (!sala) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalhes da Sala</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, mt: 1 }}>
          <Autocomplete
            fullWidth
            options={blocos}
            getOptionLabel={(option) => option.nome}
            value={blocos.find((bloco) => bloco.id === sala.bloco_id) || null}
            disabled
            renderInput={(params) => (
              <TextField
                {...params}
                label="Bloco"
                margin="dense"
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
            Salvar Alterações
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
} 