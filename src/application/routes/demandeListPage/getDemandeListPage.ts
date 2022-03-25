import ReactDOMServer from 'react-dom/server';
import { keycloak } from '../../infra/keycloak';
import { router } from '../router';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList';

router.route('/demandes').get(keycloak.protect(), async (request, response) => {
  console.log(`GET on /demandes`);

  // @ts-ignore
  console.log(request.kauth?.grant?.access_token?.content);

  const demandes = await getDemandeList();

  response.send(ReactDOMServer.renderToString(DemandeListPage(demandes)));
});
