import { UtilisateurInscritViaKeycloak } from '../../../modules/identitéKeycloak';
import { postgres } from '../../infra/postgres';
import { utilisateurKeycloakTable } from './utilisateur_keycloak';

utilisateurKeycloakTable.on<UtilisateurInscritViaKeycloak>('UtilisateurInscritViaKeycloak', ({ payload }) => {
  const { userId, keycloakId } = payload;
  return postgres.query('INSERT INTO utilisateur_keycloak VALUES ($1, $2);', [userId, keycloakId]);
});
