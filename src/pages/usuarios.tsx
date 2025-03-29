import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UsuariosView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Usuarios - ${CONFIG.appName}`}</title>
      </Helmet>

      <UsuariosView />
    </>
  );
}
