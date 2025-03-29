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
      title: 'Usuários',
      path: '/usuarios',
      icon: icon('ic-user'),
    },
  ];

  const adminNav = user?.super_user
    ? [
        {
          title: 'Cadastros de Parâmetros',
          path: '/cadastros-de-parametros',
          icon: icon('ic-disabled'),
        },
      ]
    : [];

  return [...baseNav, ...adminNav];
}
