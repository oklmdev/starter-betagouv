import { makeIdentitéKeycloak } from '../../../modules/identitéKeycloak';
import { transaction } from '../eventStore';

interface NewUserFromKeycloakArgs {
  id: string;
  keycloakId: string;
}
export async function registerNewUserFromKeycloak({ id, keycloakId }: NewUserFromKeycloakArgs): Promise<void> {
  await transaction(keycloakId, (historique) => {
    const identitéKeycloak = makeIdentitéKeycloak(keycloakId, historique);
    identitéKeycloak.inscrireUtilisateur({ userId: id, keycloakId });
    return identitéKeycloak.getPendingEvents();
  });
}
