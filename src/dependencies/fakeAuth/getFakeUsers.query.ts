import { postgres } from '../postgres';
import { FakeUser } from './FakeUser';

export const getFakeUsers = async (): Promise<FakeUser[]> => {
  const { rows } = await postgres.query("SELECT * FROM events WHERE type = 'FauxUtilisateurInscrit'");

  return rows.map(({ payload: { userId, role, nom } }) => ({ userId, role, nom }));
};
