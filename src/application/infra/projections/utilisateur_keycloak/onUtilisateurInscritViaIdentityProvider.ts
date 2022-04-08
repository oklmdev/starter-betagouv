import { UtilisateurInscritViaKeycloak } from '../../../../modules/identitéKeycloak';
import { postgres } from '../../postgres';
import { utilisateurKeycloakProjection } from './utilisateur_keycloak';

utilisateurKeycloakProjection.on<UtilisateurInscritViaKeycloak>('UtilisateurInscritViaKeycloak', ({ payload }) => {
  const { userId, keycloakId } = payload;
  return postgres.query('INSERT INTO utilisateur_keycloak VALUES ($1, $2);', [userId, keycloakId]);
});
