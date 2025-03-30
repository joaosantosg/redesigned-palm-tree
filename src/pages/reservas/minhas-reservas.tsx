import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MinhasReservasView } from 'src/sections/reservas/minhas-reservas/minhas-reservas-view';

export default function MinhasReservasPage() {
  return (
    <>
      <Helmet>
        <title>Minhas Reservas | {CONFIG.appName}</title>
      </Helmet>

      <MinhasReservasView />
    </>
  );
} 