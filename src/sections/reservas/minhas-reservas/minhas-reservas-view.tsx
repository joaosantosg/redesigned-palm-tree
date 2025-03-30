import type { IReserva } from 'src/api/services/reserva/reserva.types';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import { ReservaService } from 'src/api/services/reserva/reserva.service';

import { Iconify } from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import ReservaCreateModal from './reserva-create-modal';

dayjs.locale('pt-br');

export function MinhasReservasView() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<IReserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ReservaService.listarReservas({
        pagina: page,
        tamanho: rowsPerPage,
      });
      setData(response.dados);
      setTotalItems(response.paginacao.total);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await ReservaService.removerReserva(id);
      fetchData();
    } catch (error) {
      console.error('Erro ao remover reserva:', error);
      enqueueSnackbar(`Erro ao remover reserva ${error.response.data.mensagem}`, { variant: 'error' });
    }
  };

  const handleDetails = (id: string) => {
    navigate(`/reservas/${id}`);
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
    <Box className="minhas-reservas-view" sx={{ p: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Minhas Reservas</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenCreateModal(true)}
        >
          Nova Reserva
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
                  <Typography variant="h6">{reserva.sala.identificacao_sala}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => handleDelete(reserva.id)} color="error">
                        <Iconify icon="eva:trash-2-fill" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    <Iconify icon="eva:calendar-fill" sx={{ mr: 1 }} />
                    {dayjs(reserva.inicio).format('DD [de] MMMM [de] YYYY')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Iconify icon="eva:clock-fill" sx={{ mr: 1 }} />
                    {dayjs(reserva.inicio).format('HH:mm')} - {dayjs(reserva.fim).format('HH:mm')}
                  </Typography>
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