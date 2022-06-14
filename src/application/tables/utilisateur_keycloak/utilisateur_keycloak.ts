import { makeProjectionTable } from '../../../libs/makeProjectionTable';
import { postgres } from '../../infra/postgres';

const deleteUtilisateurKeycloakTable = 'DROP TABLE IF EXISTS utilisateur_keycloak;';
const createUtilisateurKeycloakTable = 'CREATE TABLE utilisateur_keycloak (id UUID PRIMARY KEY, keycloak_id VARCHAR(36));';

export const utilisateurKeycloakTable = makeProjectionTable({
  name: 'utilisateur_keycloak',

  reset: async () => {
    console.log('Creating utilisateur_keycloak table');
    await postgres.query(deleteUtilisateurKeycloakTable);
    await postgres.query(createUtilisateurKeycloakTable);
  },
});
