import { postgres } from '../postgres';
import { FauxUtilisateur } from './FauxUtilisateur';

export const getFakeUsers = async (): Promise<FauxUtilisateur[]> => {
  const { rows } = await postgres.query("SELECT * FROM events WHERE type = 'FauxUtilisateurInscrit'");

  return rows.map(({ payload: { userId, role, nom } }) => ({ userId, role, nom }));
};
