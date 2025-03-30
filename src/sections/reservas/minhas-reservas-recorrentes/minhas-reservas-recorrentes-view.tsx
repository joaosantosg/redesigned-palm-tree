import type { IReservaRecorrente } from 'src/api/services/reserva/reserva.types';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import DIA_ENUM from 'src/constants/dias.enum';
import { ReservaService } from 'src/api/services/reserva/reserva.service';

import { Iconify } from 'src/components/iconify';

import ReservaCreateModal from '../minhas-reservas/reserva-create-modal';

dayjs.locale('pt-br');

const frequenciaLabels = {
  DIARIO: 'Diário',
  SEMANAL: 'Semanal',
  MENSAL: 'Mensal',
};

const frequenciaColors = {
  DIARIO: 'primary',
  SEMANAL: 'info',
  MENSAL: 'warning',
} as const;

export function MinhasReservasRecorrentesView() {
  const navigate = useNavigate();
  const [data, setData] = useState<IReservaRecorrente[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('page', page);
      console.log('rowsPerPage', rowsPerPage);
      const response = await ReservaService.listarReservasRecorrentes({
        pagina: page,
        tamanho: rowsPerPage,
      });
      setData(response.dados);
      setTotalItems(response.paginacao.total);
    } catch (error) {
      console.error('Erro ao buscar reservas recorrentes:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await ReservaService.removerReservaRecorrente(id);
      fetchData();
    } catch (error) {
      console.error('Erro ao remover reserva recorrente:', error);
    }
  };

  const handleDetails = (id: string) => {
    navigate(`/reservas/recorrentes/${id}`);
  };

  const handleCreateSuccess = () => {
    fetchData();
    setOpenCreateModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="minhas-reservas-recorrentes-view" sx={{ p: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Minhas Reservas Recorrentes</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenCreateModal(true)}
        >
          Nova Reserva Recorrente
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {data.map((reserva) => (
          <Grid item xs={12} md={6} key={reserva.id}>
            <Card
              sx={{
                p: 2,
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.customShadows.z20,
                },
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{reserva.identificacao}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Ver detalhes">
                      <IconButton onClick={() => handleDetails(reserva.id)}>
                        <Iconify icon="eva:eye-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => handleDelete(reserva.id)} color="error">
                        <Iconify icon="eva:trash-2-fill" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={frequenciaLabels[reserva.frequencia]}
                    color={frequenciaColors[reserva.frequencia]}
                    size="small"
                  />
                  {reserva.tipo === 'SEMESTRE' && (
                    <Chip label="Semestre" color="secondary" size="small" />
                  )}
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    <Iconify icon="eva:clock-fill" sx={{ mr: 1 }} />
                    {dayjs(`2000-01-01T${reserva.hora_inicio}`).format('HH:mm')} -{' '}
                    {dayjs(`2000-01-01T${reserva.hora_fim}`).format('HH:mm')}
                  </Typography>
                  {reserva.frequencia === 'SEMANAL' && reserva.dia_da_semana && (
                    <Typography variant="body2" color="text.secondary">
                      <Iconify icon="eva:calendar-fill" sx={{ mr: 1 }} />
                      Dias: {reserva.dia_da_semana.map((dia) => DIA_ENUM[dia]).join(', ')}
                    </Typography>
                  )}
                  {reserva.frequencia === 'MENSAL' && reserva.dia_do_mes && (
                    <Typography variant="body2" color="text.secondary">
                      <Iconify icon="eva:calendar-fill" sx={{ mr: 1 }} />
                      Dia do mês: {reserva.dia_do_mes}
                    </Typography>
                  )}
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {reserva.motivo}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 4,
                    height: '100%',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    borderTopRightRadius: 1,
                    borderBottomRightRadius: 1,
                  }}
                />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalItems > rowsPerPage && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(totalItems / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      <ReservaCreateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </Box>
  );
} 