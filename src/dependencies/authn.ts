import { Express, RequestHandler } from 'express';
import { responseAsHtml } from '../libs/responseAsHtml';
import { ConnexionPage } from '../pages';
import { USE_KEYCLOAK } from './env';
import { keycloak } from './keycloak';
import { resolveUserFromKeycloak } from './keycloak';

export const registerAuth = (app: Express) => {
  if (USE_KEYCLOAK && keycloak) {
    app.use(keycloak.middleware());
    app.use(resolveUserFromKeycloak);
  }

  app.get('/login.html', (request, response) => {
    responseAsHtml(request, response, ConnexionPage());
  });

  app.post('/login.html', (request, response) => {
    const { email, password } = request.body;

    // Verification

    responseAsHtml(request, response, ConnexionPage());
  });
};

export const requireAuth = (): RequestHandler => {
  if (USE_KEYCLOAK && keycloak) {
    return keycloak.protect();
  }
  return (request, response, next) => {
    next();
  };
};
