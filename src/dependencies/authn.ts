import { Express, RequestHandler } from 'express';
import { USE_KEYCLOAK } from './env';
import { keycloak } from './keycloak';
import { resolveUserFromKeycloak } from './keycloak';

export const registerAuth = (app: Express) => {
  if (USE_KEYCLOAK) {
    app.use(keycloak.middleware());
    app.use(resolveUserFromKeycloak);
  }
};

export const requireAuth = (): RequestHandler => {
  if (USE_KEYCLOAK) {
    return keycloak.protect();
  }
  return (request, response, next) => {
    next();
  };
};
