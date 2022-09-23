import { Express, RequestHandler } from 'express';
import { publish } from './eventStore';
import { addFakeAuthRoutes } from './fakeAuth/addFakeAuthRoutes';
import { fakeProtect } from './fakeAuth/fakeProtect';
import { Role } from '../domain/Roles';
import { isFauxUtilisateurIdAvailable } from './fakeAuth/isFauxUtilisateurIdAvailable.query';
import { FauxUtilisateurInscrit } from '../events/FauxUtilisateurInscrit';

export const registerAuth = (app: Express) => {
  // For demo only
  addFakeAuthRoutes(app);
};

export const requireAuth = (): RequestHandler => {
  return fakeProtect;
};

export const createUserCredentials = (args: { userId: string; nom: string; role: Role }) => {
  const { userId, nom, role } = args;
  return publish(FauxUtilisateurInscrit({ userId, nom, role }));
};

export const isUserIdAvailable = async (userId: string) => {
  return isFauxUtilisateurIdAvailable(userId);
};
