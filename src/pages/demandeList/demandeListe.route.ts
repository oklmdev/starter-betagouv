import { requireAuth } from '../../dependencies/authn';
import { responseAsHtml } from '../../libs/responseAsHtml';
import { pageRouter } from '../pageRouter';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList.query';

pageRouter.route('/demandes').get(requireAuth(), async (request, response) => {
  console.log(`GET on /demandes`);

  const demandes = await getDemandeList();

  responseAsHtml(request, response, DemandeListPage({ demandes }));
});
