import ReactDOMServer from 'react-dom/server';
import { router } from '../router';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList';

// TODO: implementation in infra
const getDemande = async (demandeId: string) => ({ id: demandeId, justification: 'PLOP' });

router
  .route('/demandes')
  .get(async (request, response) => {
    console.log(`GET on /demandes`);
    const demandes = await getDemandeList();

    response.send(ReactDOMServer.renderToString(DemandeListPage(demandes)));
  })
