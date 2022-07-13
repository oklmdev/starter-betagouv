import { UtilisateurInscritViaKeycloak } from '../../domain/identitéKeycloak';
import { transaction } from '../eventStore';

interface NewUserFromKeycloakArgs {
  id: string;
  keycloakId: string;
}
export async function registerNewUserFromKeycloak({ id, keycloakId }: NewUserFromKeycloakArgs): Promise<void> {
  await transaction(keycloakId, (historique) => {
    if (historique.length) {
      throw new Error('Un utilisateur existe déjà avec cet identifiant.');
    }

    return [UtilisateurInscritViaKeycloak({ userId: id, keycloakId })];
  });
}
