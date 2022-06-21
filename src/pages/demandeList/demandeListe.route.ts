import { responseAsHtml } from '../../libs/responseAsHtml';
import { keycloak } from '../../dependencies/keycloak/keycloak';
import { pageRouter } from '../pageRouter';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList.query';

pageRouter.route('/demandes').get(keycloak.protect(), async (request, response) => {
  console.log(`GET on /demandes`);

  const demandes = await getDemandeList();

  // response.send(`<pre>${JSON.stringify(request.kauth?.grant?.access_token, null, 2)}</pre>`);

  responseAsHtml(response, DemandeListPage(demandes));
});
