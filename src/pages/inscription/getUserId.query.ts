import { postgres } from '../../dependencies/postgres';

export const getUserId = async (userId: string): Promise<Boolean> => {
  const { rows } = await postgres.query(
    "SELECT * FROM events WHERE type = 'FauxUtilisateurInscrit' AND payload ->> 'userId'=$1",
    [userId]
  );

  return rows.length > 0 && true;
};
