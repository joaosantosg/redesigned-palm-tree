import type { ISemestreCreate } from 'src/api/services/semestres/semestre.types';

import dayjs from 'dayjs';
import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { SemestreService } from 'src/api/services/semestres/semestre.service';

interface SemestreCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SemestreCreateModal({ open, onClose, onSuccess }: SemestreCreateModalProps) {
  const loading = useBoolean();
  const [error, setError] = useState<string | null>(null);
  const [identificadorError, setIdentificadorError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ISemestreCreate>({
    identificador: '',
    data_inicio: '',
    data_fim: '',
    ativo: true,
  });

  const validateIdentificador = (value: string) => {
    const regex = /^\d{4}\.[1-2]$/;
    if (!regex.test(value)) {
      return 'O identificador deve estar no formato AAAA.N (ex: 2024.1)';
    }
    const year = parseInt(value.split('.')[0], 10);
    const currentYear = new Date().getFullYear();
    if (year < currentYear) {
      return 'O ano não pode ser menor que o atual';
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'identificador') {
      const validationError = validateIdentificador(value);
      setIdentificadorError(validationError);
    }
    
    setError(null);
  };

  const handleDateChange = (field: 'data_inicio' | 'data_fim') => (date: dayjs.Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.format('YYYY-MM-DD') : '',
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (identificadorError) {
      setError('Corrija os erros antes de enviar');
      return;
    }

    if (!formData.data_inicio || !formData.data_fim) {
      setError('Preencha todas as datas');
      return;
    }

    const dataInicio = dayjs(formData.data_inicio);
    const dataFim = dayjs(formData.data_fim);

    if (dataInicio.isAfter(dataFim)) {
      setError('A data de início não pode ser maior que a data de fim');
      return;
    }

    try {
      loading.onTrue();
      await SemestreService.criarSemestre(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || 'Erro ao criar semestre');
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
            label="Identificador"
            name="identificador"
            value={formData.identificador}
            onChange={handleChange}
            margin="dense"
            required
            error={!!identificadorError}
            helperText={identificadorError || 'Use o formato AAAA.N (ex: 2024.1)'}
          />

          <DatePicker
            label="Data de Início"
            value={formData.data_inicio ? dayjs(formData.data_inicio) : null}
            onChange={handleDateChange('data_inicio')}
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
            value={formData.data_fim ? dayjs(formData.data_fim) : null}
            onChange={handleDateChange('data_fim')}
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
          <LoadingButton 
            type="submit" 
            variant="contained" 
            loading={loading.value}
            disabled={!!identificadorError}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
} 