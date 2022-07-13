import { postgres } from '../postgres';

export const isFauxUtilisateurIdAvailable = async (userId: string): Promise<Boolean> => {
  const { rows } = await postgres.query(
    "SELECT * FROM events WHERE type = 'FauxUtilisateurInscrit' AND payload ->> 'userId'=$1",
    [userId]
  );

  return rows.length === 0;
};
