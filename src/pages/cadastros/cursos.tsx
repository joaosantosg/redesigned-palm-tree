import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CursosView } from 'src/sections/cadastro/cursos/cursos-view';

export default function CursosPage() {
  return (
    <>
      <Helmet>
        <title>{`Cursos | ${CONFIG.appName}`}</title>
      </Helmet>

      <CursosView />
    </>
  );
} 