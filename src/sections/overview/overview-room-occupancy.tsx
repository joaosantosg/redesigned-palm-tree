import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { ReservaService } from 'src/api/services/reserva/reserva.service';
import { SalaService } from 'src/api/services/salas/sala.service';

dayjs.locale('pt-br');

type RoomOccupancyData = {
  sala: string;
  ocupacao: number;
};

export default function OverviewRoomOccupancy() {
  const [data, setData] = useState<RoomOccupancyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hoje = dayjs().format('YYYY-MM-DD');
        const fimSemana = dayjs().add(7, 'day').format('YYYY-MM-DD');

        // Buscar salas e reservas
        const [salas, reservas] = await Promise.all([
          SalaService.listarSalas({ tamanho: 1000 }),
          ReservaService.listarReservas({
            data_inicio: hoje,
            data_fim: fimSemana,
          }),
        ]);

        // Calcular ocupação por sala
        const ocupacaoPorSala = salas.dados.map((sala) => {
          const reservasSala = reservas.dados.filter(
            (reserva) => reserva.sala_id === sala.id
          );
          const ocupacao = (reservasSala.length / 7) * 100; // 7 dias

          return {
            sala: sala.identificacao_sala,
            ocupacao: Math.round(ocupacao),
          };
        });

        setData(ocupacaoPorSala);
      } catch (error) {
        console.error('Erro ao buscar dados de ocupação:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Ocupação das Salas</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
            <Typography color="text.secondary">Carregando...</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {data.map((item) => (
              <Box key={item.sala}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{item.sala}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.ocupacao}%
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    height: 8,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${item.ocupacao}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      transition: 'width 0.3s ease-in-out',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
} 