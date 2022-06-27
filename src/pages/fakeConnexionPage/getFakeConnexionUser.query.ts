import { postgres } from '../../dependencies/postgres';
import { FakeConnexionPageProps } from './FakeConnexionPage';

export const getFakeConnexionUser = async (): Promise<FakeConnexionPageProps['fakeUsers'] | null> => {
  const fakeUsers = await postgres.query('SELECT * FROM faux_utilisateur');

  if (!fakeUsers) return null;

  return fakeUsers.rows.map(({ id, role, nom }) => ({ userId: id, role, nom }));
};
