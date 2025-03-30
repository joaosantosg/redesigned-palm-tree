import type { IBloco } from 'src/api/services/blocos/bloco.types';
import type { ISala, ISalaUpdate } from 'src/api/services/salas/sala.types';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
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


export function SalaDetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const fetchInitialData = useCallback(async () => {
    if (!id) return;
    
    try {
      loading.onTrue();
      
      // Fetch both sala and blocos in parallel
      const [salaResponse, blocosResponse] = await Promise.all([
        SalaService.obterSala(id),
        BlocoService.listarBlocos({ pagina: 1, tamanho: 1000 }),
      ]);

      const salaData = salaResponse.dados;
      
      // Batch state updates
      setSala(salaData);
      setBlocos(blocosResponse.dados);
      setFormData({
        identificacao_sala: salaData.identificacao_sala,
        capacidade_maxima: salaData.capacidade_maxima,
        recursos: salaData.recursos,
        uso_restrito: salaData.uso_restrito,
        curso_restrito: salaData.curso_restrito,
      });
      setRecursosSelecionados(salaData.recursos);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados da sala');
    } finally {
      loading.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  const handleRecursoToggle = (recurso: string) => {
    setRecursosSelecionados((prevRecursos) => {
      const novosRecursos = prevRecursos.includes(recurso)
        ? prevRecursos.filter((r) => r !== recurso)
        : [...prevRecursos, recurso];
      
      setFormData((prevForm) => ({
        ...prevForm,
        recursos: novosRecursos,
      }));
      
      return novosRecursos;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      loading.onTrue();
      await SalaService.atualizarSala(id, formData);
      navigate('/cadastros/salas');
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
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Detalhes da Sala</Typography>

        <Button
          variant="outlined"
          onClick={() => navigate('/cadastros/salas')}
        >
          Voltar
        </Button>
      </Stack>

      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
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
                  required
                />
              )}
            />

            <TextField
              fullWidth
              label="Identificação"
              name="identificacao_sala"
              value={formData.identificacao_sala}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Capacidade Máxima"
              name="capacidade_maxima"
              type="number"
              value={formData.capacidade_maxima}
              onChange={handleChange}
              required
            />

            <Box>
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
                disabled
                sx={{ display: error ? 'block' : 'none' }}
              />
            )}

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => navigate('/cadastros/salas')}
              >
                Cancelar
              </Button>
              <LoadingButton type="submit" variant="contained" loading={loading.value}>
                Salvar Alterações
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Box>
  );
} 