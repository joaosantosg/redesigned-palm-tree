import { CadastroView } from 'src/sections/cadastro/view/cadastro-view';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';

function CadastroPage() {
  return (
    <>
      <Helmet>
        <title> {`Cadastros - ${CONFIG.appName}`}</title>
      </Helmet>
      
      <CadastroView />
    </>
  );
}

export default CadastroPage;
