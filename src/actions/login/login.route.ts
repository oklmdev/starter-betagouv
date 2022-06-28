import z from 'zod';
import { responseAsHtml } from '../../libs/responseAsHtml';
import { FakeConnexionPage } from '../../pages/fakeConnexionPage';
import { actionsRouter } from '../actionsRouter';
import { requireAuth } from '../../dependencies/authn';
import { getFakeConnexionUser } from '../../pages/fakeConnexionPage/getFakeConnexionUser.query';

actionsRouter.route('/login').post(requireAuth(), async (request, response) => {
  const fakeUsers = await getFakeConnexionUser();

  console.log(fakeUsers);

  responseAsHtml(request, response, FakeConnexionPage({ fakeUsers }));
});
