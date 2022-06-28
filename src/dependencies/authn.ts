import { Express, RequestHandler } from 'express';
import { responseAsHtml } from '../libs/responseAsHtml';
import { FakeConnexionPage } from '../pages/fakeConnexionPage';
import { getFakeConnexionUsers } from '../pages/fakeConnexionPage/getFakeConnexionUser.query';
import { USE_KEYCLOAK } from './env';
import { keycloak } from './keycloak';
import { resolveUserFromKeycloak } from './keycloak';
import asyncHandler from '../libs/asyncHandler';

export const registerAuth = (app: Express) => {
  if (USE_KEYCLOAK && keycloak) {
    app.use(keycloak.middleware());
    app.use(resolveUserFromKeycloak);
    return;
  }

  console.log('Using fake auth');

  app.get(
    '/login.html',
    asyncHandler(async (request, response) => {
      const fakeUsers = await getFakeConnexionUsers();
      const { redirectTo } = request.query;

      responseAsHtml(
        request,
        response,
        FakeConnexionPage({ fakeUsers, redirectTo: typeof redirectTo === 'string' ? redirectTo : undefined })
      );
    })
  );

  app.post(
    '/login.html',
    asyncHandler(async (request, response) => {
      const fakeUsers = await getFakeConnexionUsers();
      const { userId, redirectTo } = request.body;

      const user = fakeUsers.find((user) => user.userId === userId);

      if (!user) {
        return response.status(403);
      }

      request.session.user = { id: userId, role: user.role };
      response.redirect(redirectTo || '/');
    })
  );
};

export const requireAuth = (): RequestHandler => {
  if (USE_KEYCLOAK && keycloak) {
    return keycloak.protect();
  }

  return (request, response, next) => {
    if (!request.session.user) {
      return response.redirect(`/login.html?redirectTo=${request.url}`);
    }
    next();
  };
};
