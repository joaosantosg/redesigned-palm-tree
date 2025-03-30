import { useAuth } from 'src/contexts/auth-context';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export function useNavData() {
  const { user } = useAuth();

  const baseNav = [
    {
      title: 'Dashboard',
      path: '/',
      icon: icon('ic-analytics'),
    },
    {
      title: 'Minhas Reservas',
      path: '/reservas',
      icon: icon('ic-calendar'),
    },
    {
      title: 'Reservas Recorrentes',
      path: '/reservas/recorrentes',
      icon: icon('ic-repeat'),
    },
  ];

  const adminNav = user?.super_user
    ? [    {
      title: 'Usuários',
      path: '/usuarios',
      icon: icon('ic-user'),
    },
        {
          title: 'Cadastros de Parâmetros',
          path: '/cadastros-de-parametros',
          icon: icon('ic-settings'),
          children: [
            {
              title: 'Salas',
              path: '/cadastros/salas',
              icon: icon('ic-door'),
            },
            {
              title: 'Blocos',
              path: '/cadastros/blocos',
              icon: icon('ic-building'),
            },
            {
              title: 'Semestres',
              path: '/cadastros/semestres',
              icon: icon('ic-calendar'),
            },
          ],
        },
      ]
    : [];

  return [...baseNav, ...adminNav];
}
