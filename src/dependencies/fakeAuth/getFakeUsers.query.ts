import { postgres } from '../postgres';
import { FakeUser } from './FakeUser';

export const getFakeUsers = async (): Promise<FakeUser[]> => {
  const fakeUsers = await postgres.query('SELECT * FROM faux_utilisateur');

  return fakeUsers.rows.map(({ id, role, nom }) => ({ userId: id, role, nom }));
};
