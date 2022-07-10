import { Express, RequestHandler } from 'express';
import { USE_KEYCLOAK } from './env';
import { publish } from './eventStore';
import { addFakeAuthRoutes } from './fakeAuth/addFakeAuthRoutes';
import { fakeProtect } from './fakeAuth/fakeProtect';
import { keycloak, resolveUserFromKeycloak } from './keycloak';
import { FauxUtilisateurInscrit } from '../domain/FauxUtilisateurInscrit';
import { Role } from '../domain/authZ/Roles';
import { isFauxUtilisateurIdAvailable } from './fakeAuth/isFauxUtilisateurIdAvailable.query';

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

export const createUserCredentials = (args: { userId: string; nom: string; role: Role }) => {
  if (USE_KEYCLOAK && keycloak) {
    return;
    //ToDo Appeler KeyCloak
  }
  const { userId, nom, role } = args;
  return publish(FauxUtilisateurInscrit({ userId, nom, role }));
};

export const isUserIdAvailable = async (userId: string) => {
  if (USE_KEYCLOAK && keycloak) {
    return;
    //ToDo Appeler KeyCloak
  }
  return await isFauxUtilisateurIdAvailable(userId);
};
