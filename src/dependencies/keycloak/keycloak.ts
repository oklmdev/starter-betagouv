import Keycloak from 'keycloak-connect';
import { KEYCLOAK_REALM, KEYCLOAK_SERVER, KEYCLOAK_USER_CLIENT_ID, KEYCLOAK_USER_CLIENT_SECRET } from '../env';
import { sessionStore } from '../session';

export const keycloak =
  KEYCLOAK_SERVER &&
  KEYCLOAK_USER_CLIENT_ID &&
  KEYCLOAK_REALM &&
  KEYCLOAK_USER_CLIENT_SECRET &&
  new Keycloak(
    {
      store: sessionStore,
    },
    {
      'confidential-port': 0,
      'auth-server-url': KEYCLOAK_SERVER,
      resource: KEYCLOAK_USER_CLIENT_ID,
      'ssl-required': 'external',
      'bearer-only': false,
      realm: KEYCLOAK_REALM,
      // @ts-ignore
      credentials: {
        secret: KEYCLOAK_USER_CLIENT_SECRET,
      },
    }
  );
