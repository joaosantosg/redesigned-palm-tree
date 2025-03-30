import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { ReservaService } from 'src/api/services/reserva/reserva.service';
import { IReserva } from 'src/api/services/reserva/reserva.types';

dayjs.locale('pt-br');

export default function OverviewUpcomingReservations() {
  const [reservas, setReservas] = useState<IReserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hoje = dayjs().format('YYYY-MM-DD');
        const fimSemana = dayjs().add(7, 'day').format('YYYY-MM-DD');

        const response = await ReservaService.listarReservas({
          data_inicio: hoje,
          data_fim: fimSemana,
        });

        setReservas(response.dados);
      } catch (error) {
        console.error('Erro ao buscar próximas reservas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Próximas Reservas</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
            <Typography color="text.secondary">Carregando...</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sala</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Horário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservas.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell>{reserva.sala.identificacao_sala}</TableCell>
                    <TableCell>
                      {dayjs(reserva.inicio).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {`${dayjs(reserva.inicio).format('HH:mm')} - ${dayjs(
                        reserva.fim
                      ).format('HH:mm')}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Card>
  );
} 