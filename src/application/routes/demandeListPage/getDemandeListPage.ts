import ReactDOMServer from 'react-dom/server';
import { keycloak } from '../../infra/keycloak/keycloak';
import { router } from '../router';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList';

router.route('/demandes').get(keycloak.protect(), async (request, response) => {
  console.log(`GET on /demandes`);

  const demandes = await getDemandeList();

  // response.send(`<pre>${JSON.stringify(request.kauth?.grant?.access_token, null, 2)}</pre>`);

  response.send(ReactDOMServer.renderToString(DemandeListPage(demandes)));
});
