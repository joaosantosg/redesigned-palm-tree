import type { ISala } from 'src/api/services/salas/sala.types';
import type { 
  IReservaCreate, 
  FrequenciaRecorrencia,
  TipoReservaRecorrente,
  IReservaRecorrenteRegularCreate, 
  IReservaRecorrenteSemestreCreate 
} from 'src/api/services/reserva/reserva.types';

import * as z from 'zod';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { SalaService } from 'src/api/services/salas/sala.service';
import { ReservaService } from 'src/api/services/reserva/reserva.service';

import { useSnackbar } from 'src/components/snackbar';
import { RHFSelect, FormProvider } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const schema = z.object({
  tipo: z.enum(['REGULAR', 'RECORRENTE']),
  sala_id: z.string().min(1, 'Selecione uma sala'),
  data: z.date().min(dayjs().startOf('day').toDate(), 'A data deve ser hoje ou futura'),
  hora_inicio: z.string().min(1, 'Selecione o horário de início'),
  hora_fim: z.string().min(1, 'Selecione o horário de fim'),
  motivo: z.string().min(1, 'O motivo é obrigatório'),
  // Campos para reserva recorrente
  frequencia: z.enum(['DIARIO', 'SEMANAL', 'MENSAL']).optional(),
  dia_da_semana: z.array(z.string()).optional(),
  dia_do_mes: z.string().optional(),
  data_fim: z.date().optional(),
  tipo_recorrencia: z.enum(['REGULAR', 'SEMESTRE']).optional(),
  semestre: z.string().regex(/^\d{4}\.[12]$/, 'Formato inválido. Use YYYY.S (ex: 2024.1)').optional(),
}).refine((data) => {
  if (data.tipo === 'REGULAR') {
    const inicio = dayjs(`${dayjs(data.data).format('YYYY-MM-DD')}T${data.hora_inicio}`);
    const fim = dayjs(`${dayjs(data.data).format('YYYY-MM-DD')}T${data.hora_fim}`);
    return fim.isAfter(inicio);
  }
  return true;
}, {
  message: 'O horário de fim deve ser posterior ao horário de início',
  path: ['hora_fim'],
}).refine((data) => {
  if (data.tipo === 'RECORRENTE' && data.tipo_recorrencia === 'REGULAR') {
    if (!data.frequencia) return false;
    if (data.frequencia === 'SEMANAL' && (!data.dia_da_semana || data.dia_da_semana.length === 0)) return false;
    if (data.frequencia === 'MENSAL' && !data.dia_do_mes) return false;
    if (data.data_fim && dayjs(data.data_fim).isBefore(dayjs(data.data))) return false;
  }
  return true;
}, {
  message: 'Preencha todos os campos necessários para a frequência selecionada',
  path: ['frequencia'],
});

type FormValuesProps = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const horarios = Array.from({ length: 24 }, (_, i) => {
  const hora = i.toString().padStart(2, '0');
  return { value: `${hora}:00`, label: `${hora}:00` };
});

export default function ReservaCreateModal({ open, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<ISala[]>([]);

  const defaultValues: FormValuesProps = {
    tipo: 'REGULAR',
    sala_id: '',
    data: dayjs().toDate(),
    hora_inicio: '',
    hora_fim: '',
    motivo: '',
    frequencia: undefined,
    dia_da_semana: undefined,
    dia_do_mes: undefined,
    data_fim: undefined,
    tipo_recorrencia: undefined,
    semestre: undefined,
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await SalaService.listarSalas({ tamanho: 1000 });
        setSalas(response.dados);
      } catch (error) {
        console.error('Erro ao carregar salas:', error);
        enqueueSnackbar('Erro ao carregar salas', { variant: 'error' });
      }
    };

    if (open) {
      fetchSalas();
    }
  }, [open, enqueueSnackbar]);

  const {
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const tipo = watch('tipo');
  const frequencia = watch('frequencia');
  const tipoRecorrencia = watch('tipo_recorrencia');

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      if (data.tipo === 'REGULAR') {
        const reserva: IReservaCreate = {
          sala_id: data.sala_id,
          inicio: `${dayjs(data.data).format('YYYY-MM-DD')}T${data.hora_inicio}`,
          fim: `${dayjs(data.data).format('YYYY-MM-DD')}T${data.hora_fim}`,
          motivo: data.motivo,
        };

        await ReservaService.criarReserva(reserva);
      } else {
        const reservaRecorrente: IReservaRecorrenteRegularCreate | IReservaRecorrenteSemestreCreate = {
          sala_id: data.sala_id,
          motivo: data.motivo,
          frequencia: data.frequencia as FrequenciaRecorrencia,
          dia_da_semana: data.dia_da_semana?.map(Number),
          dia_do_mes: data.dia_do_mes ? Number(data.dia_do_mes) : undefined,
          hora_inicio: data.hora_inicio,
          hora_fim: data.hora_fim,
          data_inicio: dayjs(data.data).format('YYYY-MM-DD'),
          data_fim: data.data_fim ? dayjs(data.data_fim).format('YYYY-MM-DD') : undefined,
          tipo: data.tipo_recorrencia as TipoReservaRecorrente,
          semestre: data.semestre || '',
        };

        if (data.tipo_recorrencia === 'SEMESTRE') {
          await ReservaService.criarReservaRecorrenteSemestre(reservaRecorrente as IReservaRecorrenteSemestreCreate);
        } else {
          await ReservaService.criarReservaRecorrenteRegular(reservaRecorrente as IReservaRecorrenteRegularCreate);
        }
      }

      reset();
      onClose();
      onSuccess();

      enqueueSnackbar('Reserva criada com sucesso!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Criar Reserva</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFSelect
                  name="tipo"
                  label="Tipo de Reserva"
                  placeholder="Selecione o tipo"
                  options={[
                    { value: 'REGULAR', label: 'Regular' },
                    { value: 'RECORRENTE', label: 'Recorrente' },
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <RHFSelect
                  name="sala_id"
                  label="Sala"
                  placeholder="Selecione a sala"
                  options={salas.map((sala) => ({
                    value: sala.id,
                    label: sala.identificacao_sala,
                  }))}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                  <DatePicker
                    label="Data"
                    onChange={(newValue) => {
                      methods.setValue('data', (newValue || dayjs()).toDate());
                    }}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.data,
                        helperText: errors.data?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <RHFSelect
                  name="hora_inicio"
                  label="Horário de Início"
                  placeholder="Selecione o horário"
                  options={horarios}
                />
              </Grid>

              <Grid item xs={6}>
                <RHFSelect
                  name="hora_fim"
                  label="Horário de Fim"
                  placeholder="Selecione o horário"
                  options={horarios}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="motivo"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      label="Motivo"
                      placeholder="Digite o motivo da reserva"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>

              {watch('tipo') === 'RECORRENTE' && (
                <>
                  <Grid item xs={12}>
                    <RHFSelect
                      name="tipo_recorrencia"
                      label="Tipo de Recorrência"
                      placeholder="Selecione o tipo"
                      options={[
                        { value: 'REGULAR', label: 'Regular' },
                        { value: 'SEMESTRE', label: 'Semestre' },
                      ]}
                    />
                  </Grid>

                  {watch('tipo_recorrencia') === 'REGULAR' && (
                    <>
                      <Grid item xs={12}>
                        <RHFSelect
                          name="frequencia"
                          label="Frequência"
                          placeholder="Selecione a frequência"
                          options={[
                            { value: 'DIARIO', label: 'Diário' },
                            { value: 'SEMANAL', label: 'Semanal' },
                            { value: 'MENSAL', label: 'Mensal' },
                          ]}
                        />
                      </Grid>

                      {watch('frequencia') === 'SEMANAL' && (
                        <Grid item xs={12}>
                          <RHFSelect
                            name="dia_da_semana"
                            label="Dias da Semana"
                            placeholder="Selecione os dias"
                            options={[
                              { value: '0', label: 'Segunda' },
                              { value: '1', label: 'Terça' },
                              { value: '2', label: 'Quarta' },
                              { value: '3', label: 'Quinta' },
                              { value: '4', label: 'Sexta' },
                              { value: '5', label: 'Sábado' },
                              { value: '6', label: 'Domingo' },
                            ]}
                          />
                        </Grid>
                      )}

                      {watch('frequencia') === 'MENSAL' && (
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            type="number"
                            inputProps={{ min: 1, max: 31 }}
                            label="Dia do Mês"
                            name="dia_do_mes"
                            error={!!errors.dia_do_mes}
                            helperText={errors.dia_do_mes?.message}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                          <DatePicker
                            label="Data de Término"
                            onChange={(newValue) => {
                              methods.setValue('data_fim', (newValue || dayjs()).toDate());
                            }}
                            minDate={dayjs(methods.getValues('data'))}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: !!errors.data_fim,
                                helperText: errors.data_fim?.message,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </>
                  )}

                  {watch('tipo_recorrencia') === 'SEMESTRE' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Semestre"
                        name="semestre"
                        placeholder="YYYY.S (ex: 2024.1)"
                        error={!!errors.semestre}
                        helperText={errors.semestre?.message}
                      />
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Criando...' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
} 