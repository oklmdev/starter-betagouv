import { Express, RequestHandler } from 'express';
import { USE_KEYCLOAK } from './env';
import { addFakeAuthRoutes } from './fakeAuth/addFakeAuthRoutes';
import { fakeProtect } from './fakeAuth/fakeProtect';
import { keycloak, resolveUserFromKeycloak } from './keycloak';

export const registerAuth = (app: Express) => {
  if (USE_KEYCLOAK && keycloak) {
    app.use(keycloak.middleware());
    app.use(resolveUserFromKeycloak);
    return;
  }

  // For demo only
  addFakeAuthRoutes(app);
};

export const requireAuth = (): RequestHandler => {
  if (USE_KEYCLOAK && keycloak) {
    return keycloak.protect();
  }

  return fakeProtect;
};
