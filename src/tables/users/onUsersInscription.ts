import { postgres } from '../../dependencies/postgres';
import { InscriptionUser } from '../../domain/InscriptionUser';
import { usersTable } from './users';

usersTable.on<InscriptionUser>('InscriptionUser', ({ payload }) => {
  const { userId, username, email } = payload;
  return postgres.query('INSERT INTO users VALUES($1, $2, $3);', [userId, username, email]);
});
