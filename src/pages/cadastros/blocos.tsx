import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlocosView } from 'src/sections/cadastro/blocos/blocos-view';

function BlocosPage() {
  return (
    <>
      <Helmet>
        <title> {`Blocos - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlocosView />
    </>
  );
}

export default BlocosPage; 