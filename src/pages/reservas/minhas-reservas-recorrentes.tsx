import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MinhasReservasRecorrentesView } from 'src/sections/reservas/minhas-reservas-recorrentes/minhas-reservas-recorrentes-view';

export default function MinhasReservasRecorrentesPage() {
  return (
    <>
      <Helmet>
        <title>Minhas Reservas Recorrentes | {CONFIG.appName}</title>
      </Helmet>

      <MinhasReservasRecorrentesView />
    </>
  );
} 