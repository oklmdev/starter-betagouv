import { transaction } from '../eventStore';
import { UtilisateurInscritViaKeycloak } from '../../events';

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
