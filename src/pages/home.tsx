import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import OverviewView from 'src/sections/overview/view/overview-view';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Sistema de Reserva de Salas da Unievangelica"
        />
      </Helmet>

      <OverviewView />
    </>
  );
}
