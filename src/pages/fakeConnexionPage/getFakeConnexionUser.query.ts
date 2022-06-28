import { postgres } from '../../dependencies/postgres';
import { FakeConnexionPageProps } from './FakeConnexionPage';

export const getFakeConnexionUsers = async (): Promise<FakeConnexionPageProps['fakeUsers']> => {
  const fakeUsers = await postgres.query('SELECT * FROM faux_utilisateur');

  return fakeUsers.rows.map(({ id, role, nom }) => ({ userId: id, role, nom }));
};
