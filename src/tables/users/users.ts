import { makeProjectionTable } from '../../libs/eventSourcing/makeProjectionTable';
import { postgres } from '../../dependencies/postgres';

const deleteUsersTable = 'DROP TABLE IF EXISTS users;';

const createUsersTable = 'CREATE TABLE users (id UUID PRIMARY KEY, username VARCHAR(40) NOT NULL, email TEXT);';

export const usersTable = makeProjectionTable({
  name: 'Users',

  reset: async () => {
    console.log('Creating users table (users projection)');
    await postgres.query(deleteUsersTable);
    await postgres.query(createUsersTable);
  },
});
