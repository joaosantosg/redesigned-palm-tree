import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

const CADASTROS = [
  {
    title: 'Blocos',
    icon: 'mdi:office-building',
    path: '/blocos',
    description: 'Cadastre e gerencie os blocos do campus',
    color: 'primary.main',
  },
  {
    title: 'Salas',
    icon: 'mdi:door',
    path: '/salas',
    description: 'Cadastre e gerencie as salas de aula',
    color: 'info.main',
  },
  {
    title: 'Semestres',
    icon: 'mdi:calendar-clock',
    path: '/semestres',
    description: 'Configure os períodos letivos',
    color: 'warning.main',
  }
];

export function CadastroView() {
  const navigate = useNavigate();

  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" mb={5}>
        <Typography variant="h4">Cadastros</Typography>
      </Stack>

      <Grid container spacing={3}>
        {CADASTROS.map((item) => (
          <Grid key={item.title} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.z24,
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/cadastros${item.path}`)}
                sx={{ height: '100%', p: 0.5 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 2,
                      width: 48,
                      height: 48,
                      display: 'flex',
                      borderRadius: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${item.color}12`,
                    }}
                  >
                    <Iconify
                      icon={item.icon}
                      width={24}
                      sx={{ color: item.color }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
} 