import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SalasView } from 'src/sections/cadastro/salas/salas-view';

export default function SalasPage() {
  return (
    <>
      <Helmet>
        <title>{`Salas | ${CONFIG.appName}`}</title>
      </Helmet>

      <SalasView />
    </>
  );
} 