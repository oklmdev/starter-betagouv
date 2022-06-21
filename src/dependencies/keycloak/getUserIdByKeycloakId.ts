import { postgres } from '../postgres';

export async function getUserIdByKeycloakId(keycloakId: string): Promise<string | null> {
  const { rows } = await postgres.query('SELECT id FROM utilisateur_keycloak WHERE keycloak_id=$1', [keycloakId]);

  return rows[0]?.id ?? null;
}
