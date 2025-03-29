import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SemestresView } from 'src/sections/cadastro/semestres/semestres-view';

export default function SemestresPage() {
  return (
    <>
      <Helmet>
        <title>{`Semestres | ${CONFIG.appName}`}</title>
      </Helmet>

      <SemestresView />
    </>
  );
} 