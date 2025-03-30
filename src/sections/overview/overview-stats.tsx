import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { ReservaService } from 'src/api/services/reserva/reserva.service';
import { SalaService } from 'src/api/services/salas/sala.service';

dayjs.locale('pt-br');

type StatsProps = {
  title: string;
  total: number;
  icon: string;
  color: string;
};

export default function OverviewStats() {
  const [stats, setStats] = useState({
    reservasHoje: 0,
    ocupacaoSalas: 0,
    reservasRecorrentes: 0,
    proximasReservas: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const hoje = dayjs().format('YYYY-MM-DD');
        
        // Buscar salas e reservas dos próximos 7 dias
        const [salas, reservasAtivas, reservasRecorrentes] = await Promise.all([
          SalaService.listarSalas({ tamanho: 1000 }),
          ReservaService.listarReservas({
            data_inicio: hoje,
            data_fim: dayjs().add(7, 'day').format('YYYY-MM-DD'),
          }),
          ReservaService.listarReservasRecorrentes({
            pagina: 1,
            tamanho: 1000,
          }),
        ]);

        // Filtrar reservas de hoje a partir das reservas ativas
        const reservasHoje = reservasAtivas.dados.filter(
          (reserva) => dayjs(reserva.inicio).format('YYYY-MM-DD') === hoje
        );

        setStats({
          reservasHoje: reservasHoje.length,
          ocupacaoSalas: (reservasAtivas.dados.length / (salas.dados.length * 7)) * 100,
          reservasRecorrentes: reservasRecorrentes.dados.length,
          proximasReservas: reservasAtivas.dados.length,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  const STATS: StatsProps[] = [
    {
      title: 'Minhas Reservas Hoje',
      total: stats.reservasHoje,
      icon: 'eva:calendar-fill',
      color: '#2065D1',
    },
    {
      title: 'Ocupação das Salas',
      total: Math.round(stats.ocupacaoSalas),
      icon: 'eva:bar-chart-2-fill',
      color: '#2E7D32',
    },
    {
      title: 'Reservas Recorrentes',
      total: stats.reservasRecorrentes,
      icon: 'eva:refresh-fill',
      color: '#ED6C02',
    },
    {
      title: 'Próximas Reservas',
      total: stats.proximasReservas,
      icon: 'eva:clock-fill',
      color: '#9C27B0',
    },
  ];

  return (
    <Grid container spacing={3}>
      {STATS.map((stat) => (
        <Grid key={stat.title} item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.customShadows.z20,
              },
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {stat.title}
              </Typography>

              <Typography variant="h4">{stat.total}</Typography>

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

              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                }}
              >
                <Iconify icon={stat.icon} sx={{ color: stat.color }} />
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 