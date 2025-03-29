import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { DisciplinasView } from 'src/sections/cadastro/disciplinas/disciplinas-view';

export default function DisciplinasPage() {
  return (
    <>
      <Helmet>
        <title>{`Disciplinas | ${CONFIG.appName}`}</title>
      </Helmet>

      <DisciplinasView />
    </>
  );
} 