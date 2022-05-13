import ReactDOMServer from 'react-dom/server';
import { keycloak } from '../../infra/keycloak/keycloak';
import { router } from '../router';
import { DemandeListPage } from './DemandeListPage';
import { getDemandeList } from './getDemandeList';

router.route('/demandes').get(keycloak.protect(), async (request, response) => {
  console.log(`GET on /demandes`);

  // console.log(request.kauth?.grant?.access_token?.content);

  // console.log('request.session', request.session);

  const keycloakEmail = request.kauth?.grant?.access_token?.content.email;
  const keycloakUserId = request.kauth?.grant?.access_token?.content.sub;

  // const user = await getUserByKeycloakId(keycloakUserId);

  // const oklmUser = await getUserByEmail(keycloakEmail);
  // if (!oklmUser) {
  //   await createUser(keycloakEmail);
  // }

  // const oklmUser = await getUserByKeycloakId(keycloakId);
  // if (!oklmUser) {
  //   await createUser({
  //     keycloakUserId,
  //     email: keycloakEmail,
  //   });
  // }

  const demandes = await getDemandeList();

  // response.send(`<pre>${JSON.stringify(request.kauth?.grant?.access_token, null, 2)}</pre>`);

  response.send(ReactDOMServer.renderToString(DemandeListPage(demandes)));
});
