import { postgres } from '../postgres';

export async function getUserIdByKeycloakId(keycloakId: string): Promise<string | null> {
  const { rows } = await postgres.query(
    "SELECT * FROM events WHERE type = 'UtilisateurInscritViaKeycloak' and payload->>'keycloakId'=$1",
    [keycloakId]
  );

  return rows[0]?.payload.userId ?? null;
}
