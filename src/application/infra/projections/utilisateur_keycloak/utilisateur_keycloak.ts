import { EventDispatcher } from '../../../../archi/EventDispatcher';
import { Projection } from '../../../../archi/Projection';
import { makeEventDispatcher } from '../../../../libs/makeEventDispatcher';
import { postgres } from '../../postgres';

export const createUtilisateurKeycloakProjection =
  'DROP TABLE IF EXISTS utilisateur_keycloak; CREATE TABLE utilisateur_keycloak (id UUID PRIMARY KEY, keycloak_id VARCHAR(36));';

export const utilisateurKeycloakProjection: Projection & EventDispatcher = {
  ...makeEventDispatcher(),

  name: 'utilisateur_keycloak',

  requiresRebuild: () => {
    // Always rebuild for now
    // TODO: check if the schema has changed
    return true;
  },

  reset: () => {
    console.log('Creating utilisateur_keycloak table');
    return postgres.query(createUtilisateurKeycloakProjection);
  },
};
