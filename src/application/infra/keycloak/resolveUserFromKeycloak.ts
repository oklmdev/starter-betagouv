import type { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { getUserIdByKeycloakId } from './getUserIdByKeycloakId';
import { registerNewUserFromKeycloak } from './registerNewUserFromKeycloak';

export const resolveUserFromKeycloak: RequestHandler = async (request, response, next) => {
  if (request.session.user) {
    console.log('Found user session');
    request.user = request.session.user;
    return next();
  }

  const keycloakId = request.kauth?.grant?.access_token?.content.sub;
  if (keycloakId) {
    const userId = await getUserIdByKeycloakId(keycloakId);

    if (userId) {
      request.user = { id: userId };
      request.session.user = request.user;
      console.log(`resolveUserFromKeycloak found ${userId}`);
      return next();
    }

    // We need to create the user
    const newUser = {
      id: uuid(),
      keycloakId,
    };

    await registerNewUserFromKeycloak(newUser);
    console.log(`Registered as new user from keycloak and setting request.user=${JSON.stringify(newUser, null, 2)}`);
    request.user = newUser;
    request.session.user = newUser;
  }

  return next();
};
