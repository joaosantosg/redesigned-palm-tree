import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SalaDetailsView } from 'src/sections/cadastro/salas/sala-details-view';

export default function SalaDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Detalhes da Sala | {CONFIG.appName}</title>
      </Helmet>

      <SalaDetailsView />
    </>
  );
} 